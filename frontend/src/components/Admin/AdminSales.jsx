import React, { useState, useEffect } from 'react';
import AdminTitle from './AdminTitle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AdminSales() {
    const [orders, setOrders] = useState([]); // Raw data fetched from API
    const [mergedOrders, setMergedOrders] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30))); // Default: 30 days ago
    const [endDate, setEndDate] = useState(new Date()); // Default: Today
    const [viewType, setViewType] = useState('weekly'); // Default view is weekly

    useEffect(() => {
        const fetchCompletedOrders = async () => {
            try {
                const response = await fetch('http://localhost:3002/sales-report');
                const data = await response.json();
                console.log("Fetched Data:", data);
                setOrders(data); // Save the raw data
            } catch (error) {
                console.error('Error fetching completed orders:', error);
            }
        };

        fetchCompletedOrders();
    }, []); // Fetch data only once when the component loads

    useEffect(() => {
        const filterAndMergeData = () => {
            const filteredData = filterDataByDateRange(orders, startDate, endDate);

            const merged = filteredData.reduce((acc, order) => {
                order.products.forEach(product => {
                    const existingOrder = acc.find(item => item.productId === product.productId._id);
                    if (existingOrder) {
                        existingOrder.quantity += product.quantity;
                        existingOrder.totalSales += product.quantity * (product.productId.productPrice || 0);
                    } else {
                        acc.push({
                            productId: product.productId._id,
                            productName: product.productId.productName,
                            quantity: product.quantity,
                            unitPrice: product.productId.productPrice || 0,
                            totalSales: product.quantity * (product.productId.productPrice || 0),
                            date: order.date, // Store the order date for filtering
                        });
                    }
                });
                return acc;
            }, []);

            setMergedOrders(merged);

            const total = merged.reduce((acc, order) => acc + order.totalSales, 0);
            setTotalSales(total);
        };

        filterAndMergeData();
    }, [orders, startDate, endDate]); // Re-run filtering when orders or date range changes

    const filterDataByDateRange = (data, start, end) => {
        return data.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= start && orderDate <= end;
        });
    };

    // Function to get all weekly ranges within a given date range
    const getWeeklyRanges = (start, end) => {
        const weeks = [];
        let currentStart = new Date(start);
        let currentEnd = new Date(currentStart);
        currentEnd.setDate(currentStart.getDate() + 6); // Week end is 6 days after start

        // Iterate through the date range
        while (currentStart <= end) {
            weeks.push({
                start: new Date(currentStart),
                end: new Date(currentEnd),
            });

            currentStart.setDate(currentStart.getDate() + 7);
            currentEnd.setDate(currentEnd.getDate() + 7);
        }

        return weeks;
    };

    // Function to get all months within a given date range
    const getMonthlyRanges = (start, end) => {
        const months = [];
        const currentStart = new Date(start);
        const currentEnd = new Date(currentStart);
        currentEnd.setMonth(currentStart.getMonth() + 1); // Move to next month

        // Iterate through the date range
        while (currentStart <= end) {
            months.push({
                start: new Date(currentStart),
                end: new Date(currentEnd),
            });

            currentStart.setMonth(currentStart.getMonth() + 1);
            currentEnd.setMonth(currentEnd.getMonth() + 1);
        }

        return months;
    };

    // Function to get all years within a given date range
    const getYearlyRanges = (start, end) => {
        const years = [];
        let currentStart = new Date(start);
        let currentEnd = new Date(currentStart);
        currentEnd.setFullYear(currentStart.getFullYear() + 1); // Next year

        // Iterate through the date range
        while (currentStart <= end) {
            years.push({
                start: new Date(currentStart),
                end: new Date(currentEnd),
            });

            currentStart.setFullYear(currentStart.getFullYear() + 1);
            currentEnd.setFullYear(currentEnd.getFullYear() + 1);
        }

        return years;
    };

    // Group data by week
    const groupDataByWeek = (data, weeks) => {
        return weeks.map(week => {
            const weekStart = week.start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const weekEnd = week.end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

            const weekOrders = data.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= week.start && orderDate <= week.end;
            });

            return {
                weekStart,
                weekEnd,
                orders: weekOrders,
            };
        });
    };

    // Group data by month
    const groupDataByMonth = (data, months) => {
        return months.map(month => {
            const monthStart = month.start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            const monthEnd = month.end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            const monthOrders = data.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate.getMonth() === month.start.getMonth() &&
                       orderDate.getFullYear() === month.start.getFullYear();
            });

            return {
                monthStart,
                monthEnd,
                orders: monthOrders,
            };
        });
    };

    // Group data by year
    const groupDataByYear = (data, years) => {
        return years.map(year => {
            const yearStart = year.start.getFullYear();
            const yearEnd = year.end.getFullYear();

            const yearOrders = data.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate.getFullYear() === yearStart;
            });

            return {
                yearStart,
                yearEnd,
                orders: yearOrders,
            };
        });
    };

    // Render the grouped data based on view type
    const renderGroupedData = () => {
        let groupedData = [];
        let dateLabel = "";
        if (viewType === 'weekly') {
            const weeks = getWeeklyRanges(startDate, endDate);
            groupedData = groupDataByWeek(mergedOrders, weeks);
            dateLabel = "Week Range";
        } else if (viewType === 'monthly') {
            const months = getMonthlyRanges(startDate, endDate);
            groupedData = groupDataByMonth(mergedOrders, months);
            dateLabel = "Month";
        } else if (viewType === 'yearly') {
            const years = getYearlyRanges(startDate, endDate);
            groupedData = groupDataByYear(mergedOrders, years);
            dateLabel = "Year";
        }

        return groupedData.map((range, index) => (
            <div key={index} className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">{dateLabel}: {range.weekStart || range.monthStart || range.yearStart}</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Product</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Quantity</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Total Sales</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {range.orders.length > 0 ? (
                                        range.orders.map(order => (
                                            <tr key={order.productId}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{order.productName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{order.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{(order.totalSales).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm font-medium text-gray-800 dark:text-neutral-200">No transactions</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <AdminTitle title="Admin Sales" />
            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                    <label className="text-xs">View By: </label>
                    <select value={viewType} onChange={(e) => setViewType(e.target.value)} className="p-2 border rounded">
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                <div className="date-picker">
                    <label>Select Date Range: </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy-MM-dd"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                <div className="total-sales">
                    <h3>Total Sales: <i className="fas fa-peso-sign" />{totalSales.toFixed(2)}</h3>
                </div>

                {renderGroupedData()}
            </div>
            <Footer />
        </div>
    );
}

export default AdminSales;
