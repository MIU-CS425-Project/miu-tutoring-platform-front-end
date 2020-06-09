const debounce = require("lodash.debounce");

const tableMixin = {
  watch: {
    options: {
      handler() {
        this.loadData();
      },
      deep: true
    },
    search() {
      this.doSearch();
    }
  },
  data() {
    return {
      totalItems: 0,
      items: [],
      loading: false,
      options: {},
      search: ""
    };
  },
  methods: {
    doSearch: debounce(async function s() {
      if (this.search) {
        this.loading = true;

        const { page, itemsPerPage, sortBy, sortDesc } = this.options
        const sortColumn = sortBy.length != 0 ? sortBy[0]: this.headers[0].value;
        const sortDirection = sortDesc.length != 0 ? sortDesc[0]: false;
        
        const res = await this.resource.search(this.search, page-1, itemsPerPage, sortColumn, sortDirection);
        this.items = res.content;
        this.totalItems = res.totalElements;
        this.loading = false;

      } else {
        this.loadData();
      }
    }, 500),
    async loadData() {
      this.loading = true;

      const { page, itemsPerPage, sortBy, sortDesc } = this.options
      const sortColumn = sortBy.length != 0 ? sortBy[0]: this.headers[0].value;
      const sortDirection = sortDesc.length != 0 ? sortDesc[0]: false;
      
      this.resource.all(page-1, itemsPerPage, sortColumn, sortDirection).then(
        (res)=>{
          this.items = res.content;
          this.totalItems = res.totalElements;
          this.loading = false;
      })
      .catch(err => {
        if(err == "Forbidden"){
          this.$notify({
            type: "danger",
            title: "Error",
            message: "Nou authorized"
          });
        }
        this.loading = false;
      })

    }
  }
};
export default tableMixin;
