export const compareFilters = (filter1 , filter2 , fields) => {
    if( filter1 && filter2 ){
        for( let field of fields ){
            if( (filter1[field] && filter2[field] && filter1[field].length === filter2[field].length) ){
                filter1[field].sort();
                filter2[field].sort();
                for( let i = 0 ; i < filter1[field].length ; i++ ){
                    if( filter1[field][i] !== filter2[field][i] ){
                        return false;
                    }
                }
            }else if(!filter1[field] && !filter2[field]){
                continue;
            }
            else{
                return false;
            }
        }
        return true;
    }else if( !filter1 && !filter2 ){
        return true;
    }else{
        return false;
    }
}