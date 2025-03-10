interface InlineTag {
  pre?: string | null;
  value?: string | null;
  post?: string | null;
  type?: string;
}

export const concatTwoInlineTags = (first: InlineTag | null, second: InlineTag | null): InlineTag | null => {
  if (first == null && second == null) {
    return null;
  }

  if (first == null) {
    return second;
  }

  if (second == null) {
    return first;
  }

  // Handle empty values
  const firstValue = first.value ?? '';
  const secondValue = second.value ?? '';
  const firstPre = first.pre ?? null;
  const firstPost = first.post ?? null;
  const secondPre = second.pre ?? null;
  const secondPost = second.post ?? null;

  // Build the combined value
  let combinedValue = '';
  let combinedPre = firstPre;
  let combinedPost = secondPost;

  // Add first value if it exists
  if (firstValue) {
    combinedValue = firstValue;
  }

  // Add space between values if needed
  if (firstValue && secondValue) {
    // If there's explicit whitespace (post from first or pre from second), use that
    if (firstPost) {
      combinedValue += firstPost;
    } else if (secondPre) {
      combinedValue += secondPre;
    }
    // If no explicit whitespace but we need a space, add one
    else if (!combinedValue.endsWith(' ') && !secondValue.startsWith(' ')) {
      combinedValue += ' ';
    }
  }

  // Add second value if it exists
  if (secondValue) {
    combinedValue += secondValue;
  }

  const result = {
    pre: combinedPre,
    value: combinedValue || null,
    post: combinedPost,
    type: 'inline'
  };

  return result;
}; 