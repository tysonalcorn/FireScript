@builtin "number.ne"
@include "./math.ne"
@include "./string.ne"
@include "./matchstring.ne"
@include "./templatestring.ne"

@{%
    const setOperand = (operand, obj, variables) => {
        switch (operand.type) {
            case 'key':
                return obj[operand.value];
            case 'variable':
                return variables[operand.value];
            case 'matchstring':
                //return new RegExp(operand.value, 'i');
                throw('Cannot compare against match string.')
            default:
                return operand.value;
        };
    };
%}

expression -> (logicExp|compareExp) {%
    ([d]) => ({fn: d.fn(obj, variables)})
%}

command -> 
    keyoperand " --" [a-zA-Z]:+ " " (math|templatestring) {%
        ([key, _a, com, _b, value]) => ({
            fn: (obj, variables) => ({result: value.fn(obj, variables)}),
            key: key.value,
            command: com.join("")
        })
    %}
    | keyoperand " --" [a-zA-Z]:+ " " (sqstring|int) {%
        ([key, _a, com, _b, value]) => ({
            fn: () => ({result: value}),
            key: key.value,
            command: com.join("")
        })
    %}


logicExp -> # may need to remove logicExp from the operand conditions - we'll see if it works
    (keyExp|logicExp|compareExp|boolean) " & " (keyExp|logicExp|compareExp|boolean) {%
        ([leftOperand, _, rightOperand]) => ({
                fn: (obj, variables) => {
                    const left = typeof leftOperand === 'string' ? JSON.parse(leftOperand) : left.fn(obj, variables).result;
                    const right = typeof rightOperand === 'string' ? JSON.parse(rightOperand) : right.fn(obj, variables).result;
                    return {
                        result: left && right,
                        variables
                    }
                }
        })
    %}
    |  (keyExp|logicExp|compareExp|boolean) " | " (keyExp|logicExp|compareExp|boolean) {%
        ([leftOperand, _, rightOperand]) => ({
                fn: (obj, variables) => {
                    const left = typeof leftOperand === 'string' ? JSON.parse(leftOperand) : left.fn(obj, variables);
                    const right = typeof rightOperand === 'string' ? JSON.parse(rightOperand) : right.fn(obj, variables);
                    return {
                        result: left || right
                    }
                }
        })
    %}
keyExp -> 
    key " " matchstring {%
    ([key, _a, matchStr]) => {
        const regex = new RegExp(matchStr.result, 'i')
        return {
            leftOperand: {key: 'key', value: key},
            rightOperand: {key: 'regex', value: matchStr.result},
            fn: function (obj) {
                const match = obj[key].match(regex);
                return {
                    result: match ? true : false,
                    variables: match?.groups
                }
            }
        }
    }
    %}
key -> [a-zA-Z]:+ {%([d]) => d.join("")%}

boolean -> "true"{%id%}|"false"{%id%}
compareExp ->
    operand " != " operand:+ {%
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                //may need to throw error, make sure to test
                return {
                    result: a !== b
                }
            }
        })
    %}
    | operand " = " operand:+ {%
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: a === b
                }
            }
        })
    %}
    | operand " <= " operand:+ {%
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: a <= b
                }
            }
        })
    %}
    | operand " >= " operand:+ {%
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: a >= b
                }
            }
        })
    %}
    | operand " < " operand:+ {%
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: a < b
                }
            }
        })
    %}
    | operand " > " operand:+ {%
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: a > b
                }
            }
        })
    %}
    | operand " ~= " operand:+ {% //contains operator
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: a.toUpperCase().includes(b.toUpperCase())
                }
            }
        })
    %}
    | operand " !~= " operand:+ {% //does not contain operator
        ([leftOperand, _, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: !a.toUpperCase().includes(b.toUpperCase())
                }
            }
        })
    %}

matchop ->
    "*" {% 
    () => ({
        replace: '.*',
        original: '*'
        })
    %}
    | variableInit {% 
        ([d]) => ({
        original: d.fullStr,
        replace: `(?<${d.varName}>[a-zA-Z0-9]{${d.minWidth},${d.maxWidth}}`,
        varName: d.varName
        })
    %}

operand -> varoperand {%id%}
    | stroperand {%id%}
    | intoperand {%id%}
    | keyoperand {%id%}

varoperand -> variable {%([d]) => ({type: 'variable', value: d})%}
stroperand -> sqstring {%([d]) => ({type: 'string', value: d})%}
matchstroperand -> matchstring {%([d]) => ({type: 'matchstring', value: d})%}
intoperand -> int {%([d]) => ({type: 'int', value: d})%}
keyoperand -> [^'"\\-]:+ {%([d]) => ({type: 'key', value: d.join("")})%}

variable -> "<" [a-zA-Z0-9]:+ ">" {%([_a, d, _b]) => d.join("")%}
variableInit -> "<" [a-zA-Z0-9]:+ ("{" int ("," int):? "}") ">" {%
    ([_a, varName, width, _b]) => {
        const [_c, leftWidth, _d, rightWidthGrp, _e] = width;
        const [_f, rightWidth] = rightWidthGrp;
        return {
            varName: varName.join(""),
            minWidth: rightWidth ? leftWidth : 1,
            maxWidth: rightWidth || leftWidth,
            fullStr: [_a, varName, width, _b].join("")
        };
    }
%}