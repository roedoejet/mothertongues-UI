import { uniq } from 'lodash';

export const MTDInfo = Object.freeze({
    allEntries: window['getAllEntries'](),
    allAudioEntries: window['getAllAudioEntries'](),
    config: window['config'],
    dataDict: window['dataDict'],
    dataKeys: uniq(window['dataDict'].map(x => x['source'])),
 
    //... more of your variables
});



