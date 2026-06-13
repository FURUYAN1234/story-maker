import { Un, Xg, Qg, ef } from './legacyOptionData.js';
import { Wd, ho, ma, ns } from './selectionHelpers.js';

const la=e=>e[Math.floor(Math.random()*e.length)];function ff(){const e=Object.fromEntries(Object.entries(Un).filter(([n])=>!ns(n)&&!Wd(n)));let t=ma(e,null,!1)||ma(Un,null,!1);return t=t?t[1]:la(ho(Xg,!1)),Math.random()<.55&&(t+=" "+la(Qg)),Math.random()<.35&&(t+=" "+la(ef)),t}

export {
  ff,
};
