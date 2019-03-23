// March 22/2019 from https://github.com/roedoejet/mothertongues/blob/master/mtd/languages/config_schema.json
export interface Config {
    L1: {
        name: string
        lettersInLanguage: string[],
        compare?: string,
    },
    L2: {
        name: string,
    },
    // optional_field_name?: string,
    // credits?: object[],
    // audio_path?: string,
    // img_path?: string,
    adhoc_vars?: object[]
}

export interface DictionaryData {
    word: string,
    definition: string,
    firstWordIndex?: number;
    compare_form: string;
    sorting_form: number[];
    entryID?: string,
    optional?: object[],
    theme?: string,
    secondary_theme?: string,
    img?: string,
    audio?: any,
    definition_audio?: any,
    example_sentence?: any,
    example_sentence_definition?: any,
    example_sentence_audio: any,
    example_sentence_definition_audio: any
}