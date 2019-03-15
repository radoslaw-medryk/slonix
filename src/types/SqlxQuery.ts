export const sqlxQuerySymbol = Symbol("SQLX_QUERY");

export type SqlxQuery = {
    type: typeof sqlxQuerySymbol;
    template: TemplateStringsArray;
    values: any[];
};
