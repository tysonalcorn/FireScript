// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n*<>]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "math", "symbols": ["sum"], "postprocess": 
        ([sum]) => ({fn: (obj, variables) => sum.fn(obj, variables).result})
        },
    {"name": "sum", "symbols": ["sum", {"literal":"+"}, "product"], "postprocess": 
        ([sum, _a, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result + product.fn(obj, variables).result})})
            },
    {"name": "sum", "symbols": ["sum", {"literal":"-"}, "product"], "postprocess": 
        ([sum, _a, product]) => ({fn: (obj, variables) => ({result: sum.fn(obj, variables).result - product.fn(obj, variables).result})})
            },
    {"name": "sum", "symbols": ["product"], "postprocess": ([product]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result})})},
    {"name": "product", "symbols": ["product", {"literal":"*"}, "exp"], "postprocess": 
        ([product, _a, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result * exp.fn(obj, variables).result})})
            },
    {"name": "product", "symbols": ["product", {"literal":"/"}, "exp"], "postprocess": 
        ([product, _a, exp]) => ({fn: (obj, variables) => ({result: product.fn(obj, variables).result / exp.fn(obj, variables).result})})
            },
    {"name": "product", "symbols": ["exp"], "postprocess": ([exp]) => ({fn: (obj, variables) => {exp.fn(obj, variables).result}})},
    {"name": "exp$subexpression$1", "symbols": ["intoperand"]},
    {"name": "exp$subexpression$1", "symbols": ["varoperand"]},
    {"name": "exp", "symbols": ["exp$subexpression$1", {"literal":"^"}, "exp"], "postprocess": 
        ([operand, _a, exp], reject) => ({
            fn: (obj, variables) => {
                if(operand.type === 'variable' && !Number.isInteger(parseInt(variables[operand.value]))) {
                    reject(`variable ${operand.value} is not a number`)
                } else return {
                    result: operand.type === 'int' ? parseInt(operand.value) ** exp.result : parseInt(variables[operand.value]) ** exp.result
                }
                }
        })
            },
    {"name": "exp$subexpression$2", "symbols": ["intoperand"]},
    {"name": "exp$subexpression$2", "symbols": ["varoperand"]},
    {"name": "exp", "symbols": ["exp$subexpression$2"], "postprocess": 
        ([operand, _a, exp], reject) => ({
            fn: (obj, variables) => {
                if(operand.type === 'variable' && !Number.isInteger(parseInt(variables[operand.value]))) {
                    reject(`variable ${operand.value} is not a number`)
                } else return {
                    result: operand.type === 'int' ? parseInt(operand.value) : parseInt(variables[operand.value])
                }
                }
        })
            },
    {"name": "matchstring$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "matchstring$ebnf$1$subexpression$1$ebnf$1", "symbols": ["matchstring$ebnf$1$subexpression$1$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "matchstring$ebnf$1$subexpression$1$ebnf$2", "symbols": []},
    {"name": "matchstring$ebnf$1$subexpression$1$ebnf$2", "symbols": ["matchstring$ebnf$1$subexpression$1$ebnf$2", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "matchstring$ebnf$1$subexpression$1", "symbols": ["matchstring$ebnf$1$subexpression$1$ebnf$1", "matchop", "matchstring$ebnf$1$subexpression$1$ebnf$2"]},
    {"name": "matchstring$ebnf$1", "symbols": ["matchstring$ebnf$1$subexpression$1"]},
    {"name": "matchstring$ebnf$1$subexpression$2$ebnf$1", "symbols": []},
    {"name": "matchstring$ebnf$1$subexpression$2$ebnf$1", "symbols": ["matchstring$ebnf$1$subexpression$2$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "matchstring$ebnf$1$subexpression$2$ebnf$2", "symbols": []},
    {"name": "matchstring$ebnf$1$subexpression$2$ebnf$2", "symbols": ["matchstring$ebnf$1$subexpression$2$ebnf$2", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "matchstring$ebnf$1$subexpression$2", "symbols": ["matchstring$ebnf$1$subexpression$2$ebnf$1", "matchop", "matchstring$ebnf$1$subexpression$2$ebnf$2"]},
    {"name": "matchstring$ebnf$1", "symbols": ["matchstring$ebnf$1", "matchstring$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "matchstring", "symbols": [{"literal":"'"}, "matchstring$ebnf$1", {"literal":"'"}], "postprocess": 
        ([_a, d, _b]) => {
            let matchStr = '';
            let varNames = [];
        
            for(let i = 0; i < d.length; i++) {
                const [aStrArr, matchOp, bStrArr] = d[i]
                const aStr = Array.isArray(aStrArr) && aStrArr.length ? aStrArr.join("") : '';
                const bStr = Array.isArray(bStrArr) && bStrArr.length ? bStrArr.join("") : '';
                matchStr = matchStr + aStr + matchOp.replace + bStr;
                if(matchOp.varName) varNames.push(matchOp.varName);
            }
            return {result: matchStr, varNames};
        }
        },
    {"name": "templatestring$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "templatestring$ebnf$1$subexpression$1$ebnf$1", "symbols": ["templatestring$ebnf$1$subexpression$1$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "templatestring$ebnf$1$subexpression$1$ebnf$2", "symbols": ["variable"]},
    {"name": "templatestring$ebnf$1$subexpression$1$ebnf$2", "symbols": ["templatestring$ebnf$1$subexpression$1$ebnf$2", "variable"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "templatestring$ebnf$1$subexpression$1$ebnf$3", "symbols": []},
    {"name": "templatestring$ebnf$1$subexpression$1$ebnf$3", "symbols": ["templatestring$ebnf$1$subexpression$1$ebnf$3", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "templatestring$ebnf$1$subexpression$1", "symbols": ["templatestring$ebnf$1$subexpression$1$ebnf$1", "templatestring$ebnf$1$subexpression$1$ebnf$2", "templatestring$ebnf$1$subexpression$1$ebnf$3"]},
    {"name": "templatestring$ebnf$1", "symbols": ["templatestring$ebnf$1$subexpression$1"]},
    {"name": "templatestring$ebnf$1$subexpression$2$ebnf$1", "symbols": []},
    {"name": "templatestring$ebnf$1$subexpression$2$ebnf$1", "symbols": ["templatestring$ebnf$1$subexpression$2$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "templatestring$ebnf$1$subexpression$2$ebnf$2", "symbols": ["variable"]},
    {"name": "templatestring$ebnf$1$subexpression$2$ebnf$2", "symbols": ["templatestring$ebnf$1$subexpression$2$ebnf$2", "variable"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "templatestring$ebnf$1$subexpression$2$ebnf$3", "symbols": []},
    {"name": "templatestring$ebnf$1$subexpression$2$ebnf$3", "symbols": ["templatestring$ebnf$1$subexpression$2$ebnf$3", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "templatestring$ebnf$1$subexpression$2", "symbols": ["templatestring$ebnf$1$subexpression$2$ebnf$1", "templatestring$ebnf$1$subexpression$2$ebnf$2", "templatestring$ebnf$1$subexpression$2$ebnf$3"]},
    {"name": "templatestring$ebnf$1", "symbols": ["templatestring$ebnf$1", "templatestring$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "templatestring", "symbols": [{"literal":"'"}, "templatestring$ebnf$1", {"literal":"'"}], "postprocess": 
        ([_a, d, _b]) => {
            return {
            fn: (obj, vars) => {
        
                let str = ''
                for(let i = 0; i < d.length; i++) {
                const [aStrArr, variable, bStrArr] = d[i]
                const aStr = Array.isArray(aStrArr) && aStrArr.length ? aStrArr.join("") : '';
                const bStr = Array.isArray(bStrArr) && bStrArr.length ? bStrArr.join("") : '';
                str = str + vars[variable[0]] + bStr;
            }
                return {result: str};
            }
        }
        }
        },
    {"name": "expression$subexpression$1", "symbols": ["logicExp"]},
    {"name": "expression$subexpression$1", "symbols": ["compareExp"]},
    {"name": "expression", "symbols": ["expression$subexpression$1"], "postprocess": 
        ([d]) => ({fn: d.fn(obj, variables)})
        },
    {"name": "command$string$1", "symbols": [{"literal":" "}, {"literal":"-"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "command$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "command$ebnf$1", "symbols": ["command$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "command$subexpression$1", "symbols": ["math"]},
    {"name": "command$subexpression$1", "symbols": ["templatestring"]},
    {"name": "command", "symbols": ["keyoperand", "command$string$1", "command$ebnf$1", {"literal":" "}, "command$subexpression$1"], "postprocess": 
        ([key, _a, com, _b, value]) => {
            return {
                fn: (obj, variables) => ({result: value[0].fn(obj, variables)}),
                key: key.value,
                command: com.join("")
            }
        }
            },
    {"name": "command$string$2", "symbols": [{"literal":" "}, {"literal":"-"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "command$ebnf$2", "symbols": [/[a-zA-Z]/]},
    {"name": "command$ebnf$2", "symbols": ["command$ebnf$2", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "command$subexpression$2", "symbols": ["sqstring"]},
    {"name": "command$subexpression$2", "symbols": ["int"]},
    {"name": "command", "symbols": ["keyoperand", "command$string$2", "command$ebnf$2", {"literal":" "}, "command$subexpression$2"], "postprocess": 
        ([key, _a, com, _b, value]) => ({
            fn: () => ({result: value}),
            key: key.value,
            command: com.join("")
        })
            },
    {"name": "logicExp$subexpression$1", "symbols": ["keyExp"]},
    {"name": "logicExp$subexpression$1", "symbols": ["logicExp"]},
    {"name": "logicExp$subexpression$1", "symbols": ["compareExp"]},
    {"name": "logicExp$subexpression$1", "symbols": ["boolean"]},
    {"name": "logicExp$string$1", "symbols": [{"literal":" "}, {"literal":"&"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logicExp$subexpression$2", "symbols": ["keyExp"]},
    {"name": "logicExp$subexpression$2", "symbols": ["logicExp"]},
    {"name": "logicExp$subexpression$2", "symbols": ["compareExp"]},
    {"name": "logicExp$subexpression$2", "symbols": ["boolean"]},
    {"name": "logicExp", "symbols": ["logicExp$subexpression$1", "logicExp$string$1", "logicExp$subexpression$2"], "postprocess": 
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
            },
    {"name": "logicExp$subexpression$3", "symbols": ["keyExp"]},
    {"name": "logicExp$subexpression$3", "symbols": ["logicExp"]},
    {"name": "logicExp$subexpression$3", "symbols": ["compareExp"]},
    {"name": "logicExp$subexpression$3", "symbols": ["boolean"]},
    {"name": "logicExp$string$2", "symbols": [{"literal":" "}, {"literal":"|"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logicExp$subexpression$4", "symbols": ["keyExp"]},
    {"name": "logicExp$subexpression$4", "symbols": ["logicExp"]},
    {"name": "logicExp$subexpression$4", "symbols": ["compareExp"]},
    {"name": "logicExp$subexpression$4", "symbols": ["boolean"]},
    {"name": "logicExp", "symbols": ["logicExp$subexpression$3", "logicExp$string$2", "logicExp$subexpression$4"], "postprocess": 
        ([leftOperand, _, rightOperand]) => ({
                fn: (obj, variables) => {
                    const left = typeof leftOperand === 'string' ? JSON.parse(leftOperand) : left.fn(obj, variables);
                    const right = typeof rightOperand === 'string' ? JSON.parse(rightOperand) : right.fn(obj, variables);
                    return {
                        result: left || right
                    }
                }
        })
            },
    {"name": "keyExp", "symbols": ["key", {"literal":" "}, "matchstring"], "postprocess": 
        ([key, _a, matchStr]) => {
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
        },
    {"name": "key$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "key$ebnf$1", "symbols": ["key$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "key", "symbols": ["key$ebnf$1"], "postprocess": ([d]) => d.join("")},
    {"name": "key$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "key$ebnf$2", "symbols": ["key$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "key", "symbols": ["key", "key$ebnf$2"], "postprocess": ([str, int]) => str + int.join("")},
    {"name": "boolean$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "boolean", "symbols": ["boolean$string$1"], "postprocess": id},
    {"name": "boolean$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "boolean", "symbols": ["boolean$string$2"], "postprocess": id},
    {"name": "compareExp$string$1", "symbols": [{"literal":" "}, {"literal":"!"}, {"literal":"="}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$1", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$1", "symbols": ["compareExp$ebnf$1", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$1", "compareExp$ebnf$1"], "postprocess": 
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
            },
    {"name": "compareExp$string$2", "symbols": [{"literal":" "}, {"literal":"="}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$2", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$2", "symbols": ["compareExp$ebnf$2", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$2", "compareExp$ebnf$2"], "postprocess": 
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
            },
    {"name": "compareExp$string$3", "symbols": [{"literal":" "}, {"literal":"<"}, {"literal":"="}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$3", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$3", "symbols": ["compareExp$ebnf$3", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$3", "compareExp$ebnf$3"], "postprocess": 
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
            },
    {"name": "compareExp$string$4", "symbols": [{"literal":" "}, {"literal":">"}, {"literal":"="}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$4", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$4", "symbols": ["compareExp$ebnf$4", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$4", "compareExp$ebnf$4"], "postprocess": 
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
            },
    {"name": "compareExp$string$5", "symbols": [{"literal":" "}, {"literal":"<"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$5", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$5", "symbols": ["compareExp$ebnf$5", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$5", "compareExp$ebnf$5"], "postprocess": 
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
            },
    {"name": "compareExp$string$6", "symbols": [{"literal":" "}, {"literal":">"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$6", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$6", "symbols": ["compareExp$ebnf$6", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$6", "compareExp$ebnf$6"], "postprocess": 
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
            },
    {"name": "compareExp$string$7", "symbols": [{"literal":" "}, {"literal":"~"}, {"literal":"="}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$7", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$7", "symbols": ["compareExp$ebnf$7", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$7", "compareExp$ebnf$7"], "postprocess":  //contains operator
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
            },
    {"name": "compareExp$string$8", "symbols": [{"literal":" "}, {"literal":"!"}, {"literal":"~"}, {"literal":"="}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "compareExp$ebnf$8", "symbols": ["operand"]},
    {"name": "compareExp$ebnf$8", "symbols": ["compareExp$ebnf$8", "operand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "compareExp", "symbols": ["operand", "compareExp$string$8", "compareExp$ebnf$8"], "postprocess":  //does not contain operator
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
            },
    {"name": "matchop", "symbols": [{"literal":"*"}], "postprocess":  
        () => ({
            replace: '.*',
            original: '*'
            })
        },
    {"name": "matchop", "symbols": ["variableInit"], "postprocess":  
        ([d]) => ({
        original: d.fullStr,
        replace: `(?<${d.varName}>[a-zA-Z0-9]{${d.minWidth},${d.maxWidth}})`,
        varName: d.varName
        })
            },
    {"name": "operand", "symbols": ["varoperand"], "postprocess": id},
    {"name": "operand", "symbols": ["stroperand"], "postprocess": id},
    {"name": "operand", "symbols": ["intoperand"], "postprocess": id},
    {"name": "operand", "symbols": ["keyoperand"], "postprocess": id},
    {"name": "varoperand", "symbols": ["variable"], "postprocess": ([d]) => ({type: 'variable', value: d})},
    {"name": "stroperand", "symbols": ["sqstring"], "postprocess": ([d]) => ({type: 'string', value: d})},
    {"name": "matchstroperand", "symbols": ["matchstring"], "postprocess": ([d]) => ({type: 'matchstring', value: d})},
    {"name": "intoperand", "symbols": ["int"], "postprocess": ([d]) => ({type: 'int', value: d})},
    {"name": "keyoperand$ebnf$1", "symbols": [/[^'"\\-]/]},
    {"name": "keyoperand$ebnf$1", "symbols": ["keyoperand$ebnf$1", /[^'"\\-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "keyoperand", "symbols": ["keyoperand$ebnf$1"], "postprocess": ([d]) => ({type: 'key', value: d.join("")})},
    {"name": "variable$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable", "symbols": [{"literal":"<"}, "variable$ebnf$1", {"literal":">"}], "postprocess": ([_a, d, _b]) => d.join("")},
    {"name": "variableInit$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "variableInit$ebnf$1", "symbols": ["variableInit$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variableInit", "symbols": [{"literal":"<"}, "variableInit$ebnf$1", {"literal":"{"}, "int", {"literal":","}, "int", {"literal":"}"}, {"literal":">"}], "postprocess": 
        ([_a, varName, _b, leftWidth, _c, rightWidth, _d, _e]) => {
            return {
                varName: varName.join(""),
                minWidth: rightWidth ? leftWidth : 1,
                maxWidth: rightWidth || leftWidth,
                fullStr: [_a, varName, _b, leftWidth, _c, rightWidth, _d, _e].join("")
            };
        }
        },
    {"name": "Rule$ebnf$1", "symbols": ["Input"]},
    {"name": "Rule$ebnf$1", "symbols": ["Rule$ebnf$1", "Input"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Rule$string$1", "symbols": [{"literal":" "}, {"literal":":"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Rule", "symbols": ["Rule$ebnf$1", "Rule$string$1", "command", {"literal":";"}], "postprocess": 
        ([input, _b, output, _c]) => ({
            input,
            output
        })
        },
    {"name": "Input$ebnf$1", "symbols": ["keyExp"]},
    {"name": "Input$ebnf$1", "symbols": ["Input$ebnf$1", "keyExp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Input$ebnf$2", "symbols": [{"literal":" "}], "postprocess": id},
    {"name": "Input$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Input$ebnf$3", "symbols": ["expression"], "postprocess": id},
    {"name": "Input$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Input", "symbols": ["Input$ebnf$1", "Input$ebnf$2", "Input$ebnf$3"], "postprocess": 
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
            }
]
  , ParserStart: "Rule"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
