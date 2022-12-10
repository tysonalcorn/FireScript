@builtin "number.ne"
@include "./operators.ne"

mathexp -> [\s]:* "(" [\s]:* (math) [\s]:* ")" [\s]:* {%([_, _a, _b, d, _c, _d, _e]) => d[0]%}
    | math {%id%}

math -> parsum {%
    ([sum]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result})})
%}
parsum -> "(" [\s]:* sum [\s]:* ")" {%([_a, _b, d, _c, _d]) => d%}
    | sum {%id%}
sum -> 
    sum [\s]:* "+" [\s]:* (product|parsum) {%
        ([sum, _a, _b, _c, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result + product[0].fn(obj, variables).result})})
    %}
    | sum [\s]:* "-" [\s]:* (product|parsum) {%
        ([sum, _a, _b, _c, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result - product[0].fn(obj, variables).result})})
    %}  

    | (product) {% ([product]) => ({fn: (obj, variables) => ({result: product[0].fn(obj, variables).result})}) %}
product -> 
    product [\s]:* "*" [\s]:* exp {%
        ([product, _a, _b, _c, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result * exp.fn(obj, variables).result})})
    %}
    | product [\s]:* "/" [\s]:* exp {%
        ([product, _a, _b, _c, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result / exp.fn(obj, variables).result})})
    %}
    | exp {% ([exp]) => ({fn: (obj, variables) => ({result: exp.fn(obj, variables).result})}) %}
exp -> 
    (intoperand|varoperand) [\s]:* "^" [\s]:* exp {%
        ([operand, _a, _b, _c, exp], reject) => ({
            fn: (obj, variables) => {
                if(operand[0].type === 'variable' && !Number.isInteger(parseInt(variables[operand[0].value]))) {
                    reject(`variable ${operand[0].value} is not a number`)
                } else return {
                    result: operand[0].type === 'int' ? parseInt(operand[0].value) ** exp.fn(obj, variables).result : parseInt(variables[operand[0].value]) ** exp.fn(obj, variables).result
                }
                }
        })
    %} 
    | (intoperand|varoperand) {%
        ([operand, _a, exp], reject) => ({
            fn: (obj, variables) => {
                if(operand[0].type === 'variable' && !Number.isInteger(parseInt(variables[operand[0].value]))) {
                    reject(`variable ${operand[0].value} is not a number`)
                } else return {
                    result: operand[0].type === 'int' ? parseInt(operand[0].value) : parseInt(variables[operand[0].value])
                }
                }
        })
    %}