import React from "react";
import { Bar } from "react-chartjs-2"

const CustomDashboard = (props) => {
    return(
        <div>
            <Bar
                data={{
                    labels: props.name,
                    datasets: [
                        {
                            label: 'Kirim',
                            data: props.sumIn,
                            backgroundColor: [
                                '#97fca8',
                            ],
                            borderColor: [
                                '#2fb546',
                            ],
                            borderWidth: 2,
                        },
                        {
                            label: 'Chiqim',
                            data: props.sumOut,
                            backgroundColor: [
                                '#fc7474',
                            ],
                            borderColor: [
                                '#ff1f1f',
                            ],
                            borderWidth: 2
                        }
                    ]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        ]
                    },
                    interaction: {
                        intersect: false,
                    }
                }}
            />
        </div>
    )
}

export default CustomDashboard;