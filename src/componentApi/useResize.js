import { computed } from "vue";
import { useStore } from "vuex";

export default function() {
  const store = useStore();
  let abcode = computed(
    () => store.state.mapInfo[store.state.mapInfo.length - 1].code
  );
  let year = computed(() => store.state.year);
  let parentInfo = computed(() => store.state.mapInfo);
  const sum = computed(() => store.state.sum);

  const setCommitYear = (val) => {
    store.commit("SET_YEAR", val);
  };
  const setCommitMapInfo = (val) => {
    store.commit("ADD_INFO", val);
  };
  const removeCommitMapInfo = (val) => {
    store.commit("REMOVE_INFO", val);
  };
  const setCommitSum = (val) => {
    store.commit("SET_SUM", val);
  };

  return {
    abcode,
    sum,
    year,
    parentInfo,
    setCommitYear,
    setCommitSum,
    removeCommitMapInfo,
    setCommitMapInfo,
  };
}
