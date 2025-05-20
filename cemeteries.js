const supabaseUrl = 'https://klggihcndyvbzjpuxtas.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZ2dpaGNuZHl2YnpqcHV4dGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTkxODMsImV4cCI6MjA2MzMzNTE4M30.ILyBXIi2J7Z8mON-H6Isqh2ObGe5SCQjoxX80cQBjHo';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const dataContainer = document.getElementById('dataContainer');
const paginationContainer = document.getElementById('pagination');

const pageSize = 15;
let currentPage = 1;

async function getTotalRows() {
    const { data, error, count } = await supabase
        .from('cemeteries')
        .select('*', { count: 'exact' });

    if (error) {
        console.error('error:', error);
        return 0;
    }
    return count;
}

async function getPageData(page) {
    const offset = (page - 1) * pageSize;

    const { data, error } = await supabase
        .from('cemeteries')
        .select('*')
        .range(offset, offset + pageSize - 1);

    if (error) {
        console.error('Veri alınırken hata oluştu:', error);
        return [];
    }

    return data;
}

async function updatePagination() {
    const totalRows = await getTotalRows();
    const totalPages = Math.ceil(totalRows / pageSize);

    paginationContainer.innerHTML = '';

    const tableWidth = document.querySelector('table').offsetWidth;
    const buttonWidth = 90;
    const buttonsPerPage = Math.floor(tableWidth / buttonWidth);

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(i);
    }

    const pageButtonPromises = [];

    if (pageButtons.length > buttonsPerPage) {
        let visibleButtons = [];

        if (currentPage <= 6) {
            visibleButtons = pageButtons.slice(0, buttonsPerPage);
        } else if (currentPage >= totalPages - 5) {
            visibleButtons = pageButtons.slice(totalPages - buttonsPerPage, totalPages);
        } else {
            visibleButtons = [
                ...pageButtons.slice(currentPage - 4, currentPage + 3),
            ];
        }

        if (currentPage > 6) {
            visibleButtons.unshift('...');
        }

        if (currentPage < totalPages - 5) {
            visibleButtons.push('...');
        }

        visibleButtons.forEach(page => {
            pageButtonPromises.push(new Promise((resolve) => {
                const button = document.createElement('button');
                if (page === '...') {
                    button.classList.add('dots');
                    button.innerText = '...';
                } else {
                    button.innerText = page;
                    button.onclick = () => loadPage(page);
                    if (page === currentPage) {
                        button.classList.add('active');
                    }
                }
                paginationContainer.appendChild(button);
                resolve();
            }));
        });

        await Promise.all(pageButtonPromises);
    } else {
        pageButtons.forEach(page => {
            const button = document.createElement('button');
            button.innerText = page;
            button.onclick = () => loadPage(page);
            if (page === currentPage) {
                button.classList.add('active');
            }
            paginationContainer.appendChild(button);
        });
    }
}

async function loadPage(page) {
    currentPage = page;
    const data = await getPageData(page);

    dataContainer.innerHTML = '';
    data.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.name}</td>
            <td>${post.city}</td>
            <td>${post.address}</td>
        `;
        dataContainer.appendChild(row);
    });

    updatePagination();
}

loadPage(currentPage);
