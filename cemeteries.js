import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://klggihcndyvbzjpuxtas.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZ2dpaGNuZHl2YnpqcHV4dGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTkxODMsImV4cCI6MjA2MzMzNTE4M30.ILyBXIi2J7Z8mON-H6Isqh2ObGe5SCQjoxX80cQBjHo';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        dataContainer.appendChild(postElement);
    });
});