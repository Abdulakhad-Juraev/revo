import React from "react";
import { Bar } from "react-chartjs-2"

const Dashboard = () => {
    return(
        <div>
            <Bar
                data={{
                    labels: ['KapitalBank', 'HamkorBank', 'QurilishBank', 'InfinBank', 'XalqBank', 'GishmatBank'],
                    datasets: [
                        {
                            label: 'Kirim',
                            data: [12, 19, 3, 5, 2, 3],
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
                            data: [7, 50, 10, 80, 5, 20],
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

export default Dashboard;