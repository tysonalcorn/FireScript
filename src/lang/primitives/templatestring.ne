@include "./string.ne"
@include "./operators.ne"

templatestring -> "'" (sstrchar:* variable:+ sstrchar:*):+ "'" {%
    ([_a, d, _b]) => {
        return {
        fn: (obj, vars) => {
            
            let str = ''

            for(let i = 0; i < d.length; i++) {
                const [aStrArr, variable, bStrArr] = d[i]
                const aStr = Array.isArray(aStrArr) ? aStrArr.join("") : '';
                const bStr = Array.isArray(bStrArr) ? bStrArr.join("") : '';
                const varName = variable.substring(1, variable.length - 1);

                str.concat(aStr, varName, bStr);
            }
            return {result: str};
        }
    }
    }
%}