/**
 * URL of a story rendered standalone in Storybook's preview iframe.
 * Story IDs derive from the story title + export name,
 * e.g. 'Components/Button' + Primary -> components-button--primary.
 */
export function storyUrl(id: string, globals?: Record<string, string>): string {
  const params = new URLSearchParams({ id, viewMode: 'story' });
  if (globals) {
    params.set(
      'globals',
      Object.entries(globals)
        .map(([key, value]) => `${key}:${value}`)
        .join(';'),
    );
  }
  return `/iframe.html?${params.toString()}`;
}
