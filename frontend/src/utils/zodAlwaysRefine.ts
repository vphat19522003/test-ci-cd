import * as zod from 'zod';

export function zodAlwaysRefine<T extends zod.z.ZodTypeAny>(zodType: T) {
  return zod.any().superRefine(async (value, ctx) => {
    const res = await zodType.safeParseAsync(value);

    if (res.success === false)
      for (const issue of res.error.issues) {
        ctx.addIssue(issue);
      }
  }) as unknown as T;
}
