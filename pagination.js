export default class Pagination {

    constructor({ 
        activePageIndex = 0,
        totalPages = 0
    } = {}) {

        this.activePageIndex = activePageIndex;
        this.totalPages = totalPages;
        this.render();
        this.addEventListeners();
    }
    getPages () {
        return new Array(this.totalPages).fill(8).map((item, index) => {
            return this.getPageTemplate(index);
        }).join('');
    }
    getPageTemplate (pageIndex = 0){
        const isActive = pageIndex ===this.activePageIndex ? 'active' : '';

        return `
        <li>
         <a class="page-link ${isActive}" 
            data-page-index="${pageIndex}"
            href="#"
            >
            ${pageIndex+1}
         </a>
        </li>`;
    }

    getTemplate () {
        return `
        <div class="pagginator">
            <a class="page-prev" href="#" data-element="nav-prev"><i class="bi bi-chevron-left"></i></a>
            <ul class="page-list" data-element="pagination">
                ${this.getPages()}
            </ul>
            <a href="#" class="page-next" data-element="nav-next"><i class="bi bi-chevron-right"></i></a>
        </div>
        `;
    }

    setPage (pageIndex = 0) {
        if (pageIndex === this.activePageIndex) return;
        if (pageIndex > this.totalPages - 1 || pageIndex < 0) return;

        this.dispatchEvent(pageIndex);

        const activePage = this.element.querySelector('.page-link.active');

        if (activePage) {
            activePage.classList.remove('active');
        }

        const page = this.element.querySelector(`[data-page-index="${pageIndex}"]`);

        if (page) {
            page.classList.add('active');
        }
        this.activePageIndex = pageIndex;
    }

    nextPage () {
        const nextPageIndex = this.activePageIndex + 1;
        this.setPage(nextPageIndex);
    }

    prevPage () {
        const prevPageIndex = this.activePageIndex - 1;
        this.setPage(prevPageIndex);
    }

    render(){
        const wrapper = document.createElement('div');
        wrapper.innerHTML=this.getTemplate();
        this.element = wrapper;
    }
    addEventListeners() {
        const prevPageBtn = this.element.querySelector('[data-element="nav-prev"]');
        const nextPageBtn = this.element.querySelector('[data-element="nav-next"]');
        const pageList = this.element.querySelector('[data-element="pagination"]');


        prevPageBtn.addEventListener('click', event => {
            this.prevPage();
        });
        
        nextPageBtn.addEventListener('click', event => {
            this.nextPage();
        });

        pageList.addEventListener('click', event => {
            const pageItem = event.target.closest('.page-link');
            
            if (!pageItem) return;

            const { pageIndex } = pageItem.dataset;

            this.setPage(parseInt(pageIndex, 10));
        });
    }

    dispatchEvent (pageIndex) {
        const customEvent = new CustomEvent('page-changed', {
            detail: pageIndex
        });

        this.element.dispatchEvent(customEvent);
    }
} 


