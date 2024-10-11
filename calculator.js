// Selecting elements
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const tenure = document.getElementById("tenure");

const loanAmountValue = document.getElementById("loanAmountValue");
const interestRateValue = document.getElementById("interestRateValue");
const tenureValue = document.getElementById("tenureValue");

const loanEMI = document.getElementById("loanEMI");
const totalInterest = document.getElementById("totalInterest");
const totalPayment = document.getElementById("totalPayment");

const calculateBtn = document.getElementById("calculateBtn");

let loanChart; // Declare a global variable for the chart instance

// Function to format number as currency
function formatCurrency(num) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD'
    }).format(num);
}

// Update displayed values when sliders change
loanAmount.addEventListener("input", () => {
    loanAmountValue.textContent = loanAmount.value.toLocaleString('en-IN') + " $";
});

interestRate.addEventListener("input", () => {
    interestRateValue.textContent = interestRate.value + "%";
});

tenure.addEventListener("input", () => {
    tenureValue.textContent = tenure.value + " Years";
});

// EMI Calculation function
calculateBtn.addEventListener("click", () => {
    const principal = parseFloat(loanAmount.value);
    const interest = parseFloat(interestRate.value) / 12 / 100;
    const months = parseFloat(tenure.value) * 12;

    let emi, totalPayable, totalInterestPayable;

    if (interest === 0) {
        // Special case when interest is 0
        emi = principal / months;
        totalPayable = principal;
        totalInterestPayable = 0;
    } else {
        // Regular EMI calculation with interest
        emi = (principal * interest * Math.pow(1 + interest, months)) / (Math.pow(1 + interest, months) - 1);
        totalPayable = emi * months;
        totalInterestPayable = totalPayable - principal;
    }

    // Update the results
    loanEMI.textContent = formatCurrency(emi);
    totalInterest.textContent = formatCurrency(totalInterestPayable);
    totalPayment.textContent = formatCurrency(totalPayable);

    // If a chart already exists, destroy it before creating a new one
    if (loanChart) {
        loanChart.destroy();
    }

    // Create or update the chart
    const ctx = document.getElementById('loanChart').getContext('2d');
    loanChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Total Interest'],
            datasets: [{
                data: [principal, totalInterestPayable],
                backgroundColor: ['#ea1064', '#e2e2e2']
            }]
        },
        options: {
            responsive: true
        }
    });
});


// Open mobile menu
function openMobileMenu() {
    document.getElementById("mobileMenu").classList.add("open-menu");
}

// Close mobile menu
function closeMobileMenu() {
    document.getElementById("mobileMenu").classList.remove("open-menu");
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu.contains(event.target) && !event.target.closest('.hamburger-icon')) {
        closeMobileMenu();
    }
});
