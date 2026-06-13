function createInitialState(){return {apiKey:"",apiProvider:"gemini",geminiKey:"",openaiKey:"",mode:"4koma",genre:null,genreCategory:null,era:null,eraCategory:null,ending:null,endingCategory:null,narration:null,narrCategory:null,worldview:null,worldviewCategory:null,target:null,targetCategory:null,themeCategory:null,themeSelected:null,characters:[],charIdCounter:0,lastTitle:"",universalAssets:[],longNovel:{active:!1,totalChapters:0,currentChapter:0,chapters:[],headerInfo:null,settings:null,usedModel:null,fullText:"",cleanText:"",memoText:"",chapterRetryCounts:{},chapterRetryNotes:{}},locked:{mode:!1,theme:!1,chars:!1,genre:!1,worldview:!1,target:!1,era:!1,ending:!1,narr:!1,supplement:!1,universal:!1},defaultFilled:{},axisSource:{}};}

export {
  createInitialState,
};
