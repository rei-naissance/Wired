import { use } from 'react';

/**
 * Helper function to safely extract params in Next.js app router
 */
export function useParams<T = { [key: string]: string | string[] }>(
  params: Promise<T>
): T {
  return use(params);
}

/**
 * Helper function to extract string param safely
 */
export function getStringParam(
  param: string | string[] | undefined
): string | undefined {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
}

/**
 * Helper function to extract required string param
 */
export function getRequiredStringParam(
  param: string | string[] | undefined,
  paramName: string
): string {
  const value = getStringParam(param);
  if (!value) {
    throw new Error(`Required parameter '${paramName}' is missing`);
  }
  return value;
}
