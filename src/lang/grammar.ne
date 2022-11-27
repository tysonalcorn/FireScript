@builtin "number.ne"
@include "./primitives/string.ne"
@include "./primitives/operators.ne"

# label 'FL_<floor{2}>' : floor --set '<floor>';
Rule -> Input:+ " : " command ";" {%
    ([input, _b, output, _c]) => ({
        input,
        output
    })
%}

Input -> 
    keyExp:+ " ":? expression:? {%
        ([keyExps, _a, exps]) => ({
            fn: (obj) => {
                let vars = {};
                let match = true;
                keyExps.forEach(exp => {
                    const {variables, result} = exp.fn(obj);
                    //console.log(result);
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