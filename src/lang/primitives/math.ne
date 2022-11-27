@builtin "number.ne"

math -> sum {%
    ([sum]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result})})
%}
sum -> 
    sum " + " product {%
        ([sum, _a, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result + product.fn(obj, variables).result})})
    %}
    | sum " - " product {%
        ([sum, _a, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result - product.fn(obj, variables).result})})
    %}  

    | product {% ([product]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result})}) %}
product -> 
    product " * " exp {%
        ([product, _a, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result * exp.fn(obj, variables).result})})
    %}
    | product " / " exp {%
        ([product, _a, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result / exp.fn(obj, variables).result})})
    %}
    | exp {% ([exp]) => ({fn: (obj, variables) => ({result: exp.fn(obj, variables).result})}) %}
exp -> 
    (intoperand|varoperand) " ^ " exp {%
        ([operand, _a, exp], reject) => ({
            fn: (obj, variables) => {
                console.log(operand[0])
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