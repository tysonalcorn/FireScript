@builtin "number.ne"

math -> sum {%
    ([sum]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result})})
%}
sum -> 
    sum [\s]:* "+" [\s]:* product {%
        ([sum, _a, _b, _c, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result + product.fn(obj, variables).result})})
    %}
    | sum [\s]:* "-" [\s]:* product {%
        ([sum, _a, _b, _c, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result - product.fn(obj, variables).result})})
    %}  

    | product {% ([product]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result})}) %}
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