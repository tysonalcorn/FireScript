@include "./string.ne"
@include "./operators.ne"

matchstring -> "'" (sstrchar:* matchop:+ sstrchar:*):+ "'" {%
    ([_a, d, _b]) => {
        let matchStr = '';
        let varNames = [];

        for(let i = 0; i < d.length; i++) {
            const [aStrArr, matchOp, bStrArr] = d[i]
            const aStr = Array.isArray(aStrArr) ? aStrArr.join("") : '';
            const bStr = Array.isArray(bStrArr) ? bStrArr.join("") : '';

            matchStr.concat(aStr, matchOp.replace, bStr);
            if(matchOp.varName) varNames.push(matchOp.varName);
        }
        return {result: matchStr, varNames};
    }
%}