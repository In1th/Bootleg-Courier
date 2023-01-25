/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
    return /^[A-Za-z0-9]{20}$/.test(param);
}