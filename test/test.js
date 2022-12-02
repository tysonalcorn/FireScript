const nearley = require("nearley");
const grammar = require("../src/lang/grammar");
const {est3Array} = require("./test-data");

const rules =   [`message2 'FL <floor{1,2}>*' model 'SD' <floor> = 5 : floor --set <floor> + 1, 
                                                                    test --set 'true';`,
                `message2 'FL <floor{1,2}>*' model '<model{1,2}>' (<model> = 'SD' | <model> = 'PS') & <floor> = 1 : floor --set <floor> + (2 * 5),
                                                                                                                    test2 --set 'true';                                                    
            `]

const commands = 
    {
        set: (obj, {value, key}) => {
            let newObj = obj;
            newObj[key] = value.result;
            return newObj;
        }
    }

const main = () => {
    let data = [];

    est3Array.forEach(obj => {
        let newObj = obj;
        rules.forEach(rule => {
            const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
            let satisfied = true;
            let vars = {};
            parser.feed(rule);
            const res = parser.results.length ? parser.results[0] : null;
            let output = null;
            const {input} = res;
            //console.log(input);
            const {result, variables} = input.fn(obj);
            console.log(variables);
            if(!result) {
                satisfied = false;
            } else {
                vars = {...vars, ...variables};
                output = res.output
            }
            if(satisfied && Array.isArray(output)) {
                //console.log(vars)
                output.forEach(out => {
                    const {fn, key, command} = out;
                    const value = fn(obj, vars).result;
                    console.log("value: ", out)
                    const commandResult = commands[command](obj, {value, key});
                    if(commandResult) newObj = {...newObj, ...commandResult};
                })
            }
        })
        if(newObj) data.push(newObj);
    })
    return data;
}

console.log(main());