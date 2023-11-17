import { defineStore } from 'pinia';
import { defaultTaskState } from 'src/modules/chat';
import { ref, Ref } from 'vue';
import { run } from 'src/modules/taskWorker';
import type { LLMTask } from 'src/modules/types';
import type { FunctionArguments } from 'src/modules/tools';

//TODO: convert store into composition api
export const useTaskyonStore = defineStore('taskyonState', () => {
  console.log('initialize taskyon');

  const initialState = {
    chatState: defaultTaskState(),
    expertMode: false,
    showCosts: false,
    modelDetails: false,
    selectChatBotExpand: true,
    allowedToolsExpand: false,
    showTaskData: false,
    drawerOpen: false,
    drawerRight: false,
    taskDraft: {} as Partial<LLMTask>,
    draftParameters: {} as Record<string, FunctionArguments>,
    debugMessageExpand: {},
    darkTheme: 'auto' as boolean | 'auto',
    messageDebug: {} as Record<string, boolean>, // whether message with ID should be open or not...
  };

  // Create refs for each property and adjust the type assertion
  const stateRefs = Object.fromEntries(
    Object.entries(initialState).map(([key, value]) => [key, ref(value)])
  ) as { [K in keyof typeof initialState]: Ref<(typeof initialState)[K]> };

  return { ...stateRefs };
});

const store = useTaskyonStore();
void run(store.chatState);

// this file can be replaced in kubernetes  using a configmap!
// that way we can configure our webapp even if its already compiled...
/*void axios.get('config.json').then((jsonconfig) => {
  // we only want to load the initial configuration the first time we are loading the page...
  if (store.initial) {
    console.log('load App Config', jsonconfig.data);
    store.$state = jsonconfig.data as typeof store.$state;
    store.initial = false;
  }
  store.updateApiUrl();
});*/
