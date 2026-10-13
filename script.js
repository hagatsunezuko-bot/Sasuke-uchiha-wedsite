const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const statusFilter = document.getElementById('statusFilter');
const cards = [...document.querySelectorAll('.anime-card')];
const emptyState = document.getElementById('emptyState');
const watchlistItems = document.getElementById('watchlistItems');
const watchCount = document.getElementById('watchCount');
const toast = document.getElementById('toast');
const saved = new Set();
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
function filterCards(){
 const query=searchInput.value.trim().toLowerCase(), genre=genreFilter.value, status=statusFilter.value;
 let visible=0;
 cards.forEach(card=>{
  const title=card.dataset.title.toLowerCase(), genres=(card.dataset.genre+' '+card.querySelector('.card-info p').textContent).toLowerCase();
  const matches=title.includes(query)||genres.includes(query);
  const genreMatch=genre==='all'||genres.includes(genre.toLowerCase());
  const statusMatch=status==='all'||card.dataset.status===status;
  card.hidden=!(matches&&genreMatch&&statusMatch);if(!card.hidden)visible++;
 });
 emptyState.hidden=visible>0;
}
function renderWatchlist(){
 watchCount.textContent=saved.size;
 if(!saved.size){watchlistItems.innerHTML='<p class="watchlist-empty">Your watchlist is empty. Tap the ＋ on any anime to save it here.</p>';return}
 watchlistItems.innerHTML='';
 saved.forEach(title=>{
  const chip=document.createElement('div');chip.className='saved-chip';
  const name=document.createElement('span');name.textContent=title;
  const remove=document.createElement('button');remove.textContent='×';remove.setAttribute('aria-label','Remove '+title);
  remove.addEventListener('click',()=>{saved.delete(title);renderWatchlist();notify(title+' removed from your watchlist')});
  chip.append(name,remove);watchlistItems.append(chip);
 });
}
function toggleSaved(title){
 if(saved.has(title)){saved.delete(title);notify(title+' removed from your watchlist')}
 else{saved.add(title);notify(title+' added to your watchlist')}
 renderWatchlist();
 document.querySelectorAll('[data-title="'+CSS.escape(title)+'"].add-btn').forEach(btn=>btn.textContent=saved.has(title)?'✓':'＋');
}
searchInput.addEventListener('input',filterCards);genreFilter.addEventListener('change',filterCards);statusFilter.addEventListener('change',filterCards);
document.getElementById('resetFilters').addEventListener('click',()=>{searchInput.value='';genreFilter.value='all';statusFilter.value='all';filterCards();notify('Filters reset')});
document.querySelectorAll('.add-btn').forEach(btn=>btn.addEventListener('click',()=>toggleSaved(btn.dataset.title)));
document.querySelectorAll('.watch-btn').forEach(btn=>btn.addEventListener('click',()=>toggleSaved(btn.dataset.title)));
document.querySelectorAll('.play').forEach(btn=>btn.addEventListener('click',()=>notify('Demo preview — connect your own legal streaming links here.')));
document.getElementById('signInBtn').addEventListener('click',()=>notify('Sign-in is a demo feature. Add authentication to enable accounts.'));
document.getElementById('menuBtn').addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open'));
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==searchInput){e.preventDefault();searchInput.focus()}if(e.key==='Escape'){searchInput.blur();document.querySelector('.nav-links').classList.remove('open')}});
filterCards();renderWatchlist();