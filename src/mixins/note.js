import {
  createNamespacedHelpers
} from 'vuex';
// store
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers('tanyp/note');

export default {
  computed: {
    ...mapState(['types', 'notes']),
    ...mapGetters(['getType'])
  },
  methods: {
    ...mapActions(['queryAllNote'])
  },
  created() {
    this.queryAllNote();
  }
}
