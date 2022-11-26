@builtin "number.ne"

math -> sum {%
    ([sum]) => ({result: sum.fn(obj, variables).result})
%}
sum -> 
    sum "+" product {%
        ([sum, _a, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result + product.fn(obj, variables).result})})
    %}
    | sum "-" product {%
        ([sum, _a, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result - product.fn(obj, variables).result})})
    %}  

    | product {% ([product]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result})}) %}
product -> 
    product "*" exp {%
        ([product, _a, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result * exp.fn(obj, variables).result})})
    %}
    | product "/" exp {%
        ([product, _a, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result / exp.fn(obj, variables).result})})
    %}
    | exp {% ([exp]) => ({fn: (obj, variables) => {exp.fn(obj, variables).result}}) %}
exp -> 
    (intoperand|varoperand) "^" exp {%
        ([operand, _a, exp], reject) => ({
            fn: (obj, variables) => {
                if(operand.type === 'variable' && !Number.isInteger(parseInt(variables[operand.value]))) {
                    reject(`variable ${operand.value} is not a number`)
                } else return {
                    result: operand.type === 'int' ? parseInt(operand.value) ** exp.result : parseInt(variables[operand.value]) ** exp.result
                }
                }
        })
    %} 
    | (intoperand|varoperand) {%
        ([operand, _a, exp], reject) => ({
            fn: (obj, variables) => {
                if(operand.type === 'variable' && !Number.isInteger(parseInt(variables[operand.value]))) {
                    reject(`variable ${operand.value} is not a number`)
                } else return {
                    result: operand.type === 'int' ? parseInt(operand.value) : parseInt(variables[operand.value])
                }
                }
        })
    %}