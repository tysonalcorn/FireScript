@builtin "number.ne"
@include "./primitives/string.ne"
@include "./primitives/operators.ne"

# label 'FL_<floor{2}>' : floor --set '<floor>';
Rule -> Input [\s]:* ":" [\s]:* command:+ ";" {%
    ([input, _b, _c, _d, output, _e]) => ({
        input,
        output
    })
%}

Input -> 
    keyExp:+ parlogic:+ {%
        ([keyExps, exps]) => ({
            fn: (obj) => {
                let vars = {};
                let match = true;
                console.log(exps)
                keyExps.forEach(exp => {
                    const {variables, result} = exp.fn(obj);
                    if(!JSON.parse(result)) match = false;
                    if(variables) {
                        vars = {...vars, ...variables}
                    };
                });
                if(match && exps) {
                    exps.forEach(exp => {
                        const {result} = exp.fn(obj, vars);
                        if(!JSON.parse(result)) match = false;
                    })
                };
                return {result: match, variables: vars}
            }
        })
    %}