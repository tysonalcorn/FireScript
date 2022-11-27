@include "./string.ne"
@include "./operators.ne"

templatestring -> "'" (sstrchar:* variable:+ sstrchar:*):+ "'" {%
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
%}