import { uniq } from 'lodash';

export const MTDInfo = Object.freeze({
    dataKeys: uniq(window['dataDict'].map(x => x['source'])),
 
    //... more of your variables
});



