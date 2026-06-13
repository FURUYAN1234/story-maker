function createAxisUiConfig(categories){
  return {
    theme:{catId:"theme-cat-chips",subId:"theme-sub-chips",customId:"theme-custom",clearId:"theme-custom-clear",stateKey:"themeSelected",catKey:"themeCategory",categories:categories.theme,lockKey:"theme"},
    genre:{catId:"genre-cat-chips",subId:"genre-sub-chips",customId:"genre-custom",clearId:"genre-custom-clear",stateKey:"genre",catKey:"genreCategory",categories:categories.genre,lockKey:"genre"},
    worldview:{catId:"worldview-cat-chips",subId:"worldview-sub-chips",customId:"worldview-custom",clearId:"worldview-custom-clear",stateKey:"worldview",catKey:"worldviewCategory",categories:categories.worldview,lockKey:"worldview"},
    target:{catId:"target-cat-chips",subId:"target-sub-chips",customId:"target-custom",clearId:"target-custom-clear",stateKey:"target",catKey:"targetCategory",categories:categories.target,lockKey:"target"},
    era:{catId:"era-cat-chips",subId:"era-sub-chips",customId:"era-custom",clearId:"era-custom-clear",stateKey:"era",catKey:"eraCategory",categories:categories.era,lockKey:"era"},
    ending:{catId:"ending-cat-chips",subId:"ending-sub-chips",customId:"ending-custom",clearId:"ending-custom-clear",stateKey:"ending",catKey:"endingCategory",categories:categories.ending,lockKey:"ending"},
    narr:{catId:"narr-cat-chips",subId:"narr-sub-chips",customId:"narr-custom",clearId:"narr-custom-clear",stateKey:"narration",catKey:"narrCategory",categories:categories.narr,lockKey:"narr"},
  };
}

export {
  createAxisUiConfig,
};
