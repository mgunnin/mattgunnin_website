import posthog from 'posthog-js';

interface LLMGenerationEvent {
  model: string;
  provider?: string;
  inputMessages: Array<{ role: string; content: string }>;
  outputContent: string;
  inputTokens?: number;
  outputTokens?: number;
  latencyMs: number;
  success: boolean;
  error?: string;
  traceId?: string;
  metadata?: Record<string, any>;
}

// Rough token estimation (4 chars ~= 1 token for English text)
const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};

// Cost per 1M tokens (approximate as of 2025)
const MODEL_COSTS: Record<string, { input: number; output: number }> = {
  'gemini-2.5-flash': { input: 0.075, output: 0.30 },
  'gemini-2.5-pro': { input: 1.25, output: 5.00 },
  'gemini-3-pro-preview': { input: 1.25, output: 5.00 },
  'gemini-3-pro-image-preview': { input: 1.25, output: 5.00 },
};

const calculateCost = (
  model: string,
  inputTokens: number,
  outputTokens: number
): number => {
  const costs = MODEL_COSTS[model] || { input: 0.10, output: 0.40 };
  const inputCost = (inputTokens / 1_000_000) * costs.input;
  const outputCost = (outputTokens / 1_000_000) * costs.output;
  return inputCost + outputCost;
};

export const trackLLMGeneration = (event: LLMGenerationEvent): void => {
  const inputText = event.inputMessages.map(m => m.content).join('\n');
  const inputTokens = event.inputTokens ?? estimateTokens(inputText);
  const outputTokens = event.outputTokens ?? estimateTokens(event.outputContent);
  const totalCost = calculateCost(event.model, inputTokens, outputTokens);

  posthog.capture('$ai_generation', {
    // Core LLM properties (PostHog schema)
    $ai_provider: event.provider || 'google',
    $ai_model: event.model,
    $ai_input: event.inputMessages,
    $ai_input_tokens: inputTokens,
    $ai_output_choices: [{ content: event.outputContent }],
    $ai_output_tokens: outputTokens,
    $ai_latency: event.latencyMs / 1000, // PostHog expects seconds
    $ai_total_cost_usd: totalCost,
    $ai_http_status: event.success ? 200 : 500,

    // Custom properties
    $ai_trace_id: event.traceId,
    $ai_is_error: !event.success,
    $ai_error: event.error,

    // Additional metadata
    ...event.metadata,
  });
};

// Helper to create a trace ID for conversation tracking
export const createTraceId = (): string => {
  return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Helper to wrap async LLM calls with timing
export const withLLMTracking = async <T>(
  model: string,
  inputMessages: Array<{ role: string; content: string }>,
  llmCall: () => Promise<T>,
  extractOutput: (result: T) => string,
  metadata?: Record<string, any>
): Promise<T> => {
  const startTime = performance.now();
  const traceId = createTraceId();

  try {
    const result = await llmCall();
    const latencyMs = performance.now() - startTime;
    const outputContent = extractOutput(result);

    trackLLMGeneration({
      model,
      inputMessages,
      outputContent,
      latencyMs,
      success: true,
      traceId,
      metadata,
    });

    return result;
  } catch (error) {
    const latencyMs = performance.now() - startTime;

    trackLLMGeneration({
      model,
      inputMessages,
      outputContent: '',
      latencyMs,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      traceId,
      metadata,
    });

    throw error;
  }
};
