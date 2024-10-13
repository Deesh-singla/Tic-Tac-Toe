document.getElementById('submit').addEventListener("click",()=>{
    let player1=document.getElementById('p1').value || 'Player 1';
    let player2=document.getElementById('p2').value || 'Player 2';
    console.log(player1,player2);
    localStorage.setItem('p1',player1);
    localStorage.setItem('p2',player2);
    window.location.href='main.html';
})