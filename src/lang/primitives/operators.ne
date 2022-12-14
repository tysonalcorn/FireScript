@builtin "number.ne"
@include "./math.ne"
@include "./string.ne"
@include "./matchstring.ne"
@include "./templatestring.ne"

# TO-DO: figure out logic and stuff

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

parlogic -> 
    "(" [\s]:* (logic|parlogic) [\s]:* ")" {%
        ([_a, _b, d, _c, _d]) => d[0]
    %}
    | logic {%id%}

logic -> # may need to remove logicExp from the operand conditions - we'll see if it works
    (parexpression) [\s]:* "&" [\s]:* (parexpression) {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
    |  (parexpression) [\s]:* "|" [\s]:* (parexpression) {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
                fn: (obj, variables) => {
                    const left = typeof leftOperand === 'string' ? JSON.parse(leftOperand) : left.fn(obj, variables);
                    const right = typeof rightOperand === 'string' ? JSON.parse(rightOperand) : right.fn(obj, variables);
                    return {
                        result: left || right
                    }
                }
        })
    %}
    | parexpression {%id%}

parexpression -> [\s]:* "(" [\s]:* (expression|parexpression) [\s]:* ")" [\s]:* {%([_, _a, _b, d, _c, _d, _e]) => d[0]%}
    | expression {%id%}

expression -> [\s]:* (compareExp|boolean) [\s]:* {%
    ([_a, d, _b]) => ({fn: (obj, variables) => d[0].fn(obj, variables)})
%}

command -> 
    keyoperand [\s]:* "--" [a-zA-Z]:+ [\s]:* (mathexp|templatestring) {%
        ([key, _a, _b, com, _c, value]) => {
            console.log('math or template: ', value);
            return {
                fn: (obj, variables) => ({result: value[0].fn(obj, variables)}),
                key: key.value,
                command: com.join("")
            }
        }
    %}
    | keyoperand [\s]:* "--" [a-zA-Z]:+ [\s]:* (sqstring|int) {%
        ([key, _a, _b, com, _c, value]) => ({
            fn: () => ({result: {result: value[0]}}),
            key: key.value,
            command: com.join("")
        })
    %}
    | "," [\s]:* command {%([_a, _b, com]) => com%}

keyExp -> 
    key [\s]:* matchstring [\s]:* {%
    ([key, _a, matchStr, _b]) => {
        const regex = new RegExp(matchStr.result, 'i')
        return {
            leftOperand: {key: 'key', value: key},
            rightOperand: {key: 'regex', value: matchStr.result},
            fn: function (obj) {
                const match = typeof obj[key] === 'string' ? obj[key].match(regex) : null;
                return {
                    result: match ? true : false,
                    variables: match?.groups ? {...match.groups} : {}
                }
            }
        }
    }
    %}
    | key [\s]:* sqstring {%
    ([key, _a, str]) => {
        return {
            leftOperand: {type: 'key', value: key},
            rightOperand: {type: 'string', value: str},
            fn: function (obj) {
                const match = typeof obj[key] === 'string' ? (obj[key] == str) : null;
                return {
                    result: match ? true : false,
                    //variables: match?.groups ? {...match.groups} : {}
                }
            }
        }
    }
    %}
key -> [a-zA-Z0-9]:+ {%([d]) => d.join("")%}

boolean -> "true"{%id%}|"false"{%id%}
compareExp ->
    operand [\s]:* "!=" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
    | operand [\s]:* "=" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
            leftOperand,
            rightOperand,
            fn: (obj, variables) => {
                const a = setOperand(leftOperand, obj, variables);
                const b = setOperand(rightOperand, obj, variables);
                return {
                    result: a == b
                }
            }
        })
    %}
    | operand [\s]:* "<=" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
    | operand [\s]:* ">=" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
    | operand [\s]:* "<" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
    | operand [\s]:* ">" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
    | operand [\s]:* "~=" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
    | operand [\s]:* "!~=" [\s]:* operand {%
        ([leftOperand, _a, _b, _c, rightOperand]) => ({
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
        replace: `(?<${d.varName}>[a-zA-Z0-9]{${d.minWidth},${d.maxWidth}})`,
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
keyoperand -> [^'"\\-\\:\s]:+ {%([d]) => ({type: 'key', value: d.join("")})%}

variable -> "<" [a-zA-Z0-9]:+ ">" {%([_a, d, _b]) => d.join("")%}
variableInit -> "<" [a-zA-Z0-9]:+ "{" int "," int "}" ">" {%
    ([_a, varName, _b, leftWidth, _c, rightWidth, _d, _e]) => {
        return {
            varName: varName.join(""),
            minWidth: rightWidth ? leftWidth : 1,
            maxWidth: rightWidth || leftWidth,
            fullStr: [_a, varName, _b, leftWidth, _c, rightWidth, _d, _e].join("")
        };
    }
%}