// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Fungsi untuk menghitung total
var getTotal = function(data) {
  return data.reduce((a, b) => a + b, 0);
};

// Data untuk chart
const chartData = [243, 60, 26, 27, 94, 36];
const labels = ["Karyawan", "Wiraswasta", "Petani", "Pertukangan", "Buruh Tani", "Pensiunan"];
const total = getTotal(chartData);

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      data: chartData,
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#dda20a', '#be2617', '#6c757d'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: function(chart) {
            return chart.data.labels.map((label, i) => ({
              text: `${label}: ${chart.data.datasets[0].data[i]}`, // Tambahkan angka ke label
              fillStyle: chart.data.datasets[0].backgroundColor[i],
              hidden: false,
              index: i,
            }));
          }
        }
      }
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      // display: false // Menampilkan legend dengan angka
    },
    cutoutPercentage: 60, // Ubah ini untuk memperbesar doughnut chart
  },
  plugins: [
    {
      id: 'valueLabels',
      afterDatasetsDraw: function(chart) {
        const ctx = chart.ctx;
        chart.data.datasets.forEach(function(dataset, i) {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach(function(element, index) {
            // Posisi text
            const position = element.tooltipPosition();
            const value = dataset.data[index];

            // Styling angka pada pie chart
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Nunito';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(value, position.x, position.y); // Render angka di tengah slice
          });
        });
      }
    }
  ]
});