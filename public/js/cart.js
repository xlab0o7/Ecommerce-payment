const payBtn = document.querySelector('.btn-buy');

payBtn.addEventListener('click', () => {
    const items = JSON.parse(localStorage.getItem('cartItems'));
    fetch("/stripe-checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items }),
    })
        .then((res) => res.json())
        .then(({ url }) => {
            // console.log(url)
            location.href = url;
            clearCart();
        })

        .catch((err) => { console.error('Error during payment process:', err) }
        );
});


// payBtn.addEventListener('click', () => {
//     fetch('/stripe-checkout', {
//         method: 'post',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//         body: JSON.stringify({
//             items: JSON.parse(localStorage.getItem('cartItems')),
//         })

//     }
//     )
//     console.log(body)
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error('Network response was not ok.');
//             }
//             return res.json();
//         })
//         .then((url) => {
//             location.href = url;
//             clearCart();
//         })
//         .catch((err) => {
//             console.error('Error during payment process:', err);
//         });

// });