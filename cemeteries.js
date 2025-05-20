const supabaseUrl = 'https://klggihcndyvbzjpuxtas.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZ2dpaGNuZHl2YnpqcHV4dGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTkxODMsImV4cCI6MjA2MzMzNTE4M30.ILyBXIi2J7Z8mON-H6Isqh2ObGe5SCQjoxX80cQBjHo';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async function () {

    const { data, error } = await supabase
        .from('cemeteries')
        .select('*');

    if (error) {
        console.error('supabase error', error);
        return;
    }
	console.log('Fetched data:', data);
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    data.forEach(post => {
        const row = document.createElement('tr'); // Yeni bir satır oluştur

        row.innerHTML = `
            <td>${post.name}</td>
            <td>${post.city}</td>
            <td>${post.address}</td>
        `;

        dataContainer.appendChild(row); // Satırı tabloya ekle
    });
});