import React, { useState, useEffect } from 'react';
import AdminTitle from './AdminTitle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AdminSales() {
    const [orders, setOrders] = useState([]); // raw data fetched from API
    const [mergedOrders, setMergedOrders] = useState([]);
    const [totalSales, setTotalSales] = useState(0); // total sales value
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30))); // default is 30 days ago
    const [endDate, setEndDate] = useState(new Date()); // default is date today
    const [viewType, setViewType] = useState('weekly'); // default view is weekly

    // fetch orders
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
    }, []); // fetch data only once when the component loads

    // filter and merge data based on selected date range
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

    // filter data within date range
    const filterDataByDateRange = (data, start, end) => {
        return data.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= start && orderDate <= end;
        });
    };

    // function to get all weekly ranges within a given date range
    const getWeeklyRanges = (start, end) => {
        const weeks = [];
        let currentStart = new Date(start);
        let currentEnd = new Date(currentStart);
        currentEnd.setDate(currentStart.getDate() + 6); // Week end is 6 days after start

        // iterate through the date range
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

    // function to get all months within a given date range
    const getMonthlyRanges = (start, end) => {
        const months = [];
        const currentStart = new Date(start);
        const currentEnd = new Date(currentStart);
        currentEnd.setMonth(currentStart.getMonth() + 1); // Move to next month

        // iterate through the date range
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

    // function to get all years within a given date range
    const getYearlyRanges = (start, end) => {
        const years = [];
        let currentStart = new Date(start);
        let currentEnd = new Date(currentStart);
        currentEnd.setFullYear(currentStart.getFullYear() + 1); // Next year

        // iterate through the date range
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

    // group data by week
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

    // group data by month
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

    // group data by year
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

    // render the grouped data based on view type
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
            <div key={index} className="flex flex-col bg-green-100 p-3 rounded-lg">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">{dateLabel}: {range.weekStart || range.monthStart || range.yearStart}</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Product</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {range.orders.length > 0 ? (
                                        range.orders.map(order => (
                                            <tr key={order.productId}>
                                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-black-200">{order.productName}</td>
                                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-black-200">{order.quantity}</td>
                                                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-black-200">{(order.totalSales).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm font-medium text-gray-800 dark:text-black-200">No transactions</td>
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

    // UI component
    return (
        <div>
            <div className='p-5 pb-0'>
               <AdminTitle title="Admin Sales" /> 
            </div>
            <div className='m-5 bg-green-200 p-5'>
                <div className='flex w-full items-center justify-between'>
                    <div className="flex items-center space-x-2">
                        <label className="text-xs">View By: </label>
                        <select value={viewType} onChange={(e) => setViewType(e.target.value)} className="p-2 border rounded">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="date-picker">
                        <label className='text-xs'>Select Date Range: </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="yyyy-MM-dd"
                            className='bg-white rounded-md border border-gray-300 mr-2 p-1'
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="yyyy-MM-dd"
                            className='bg-white rounded-md border border-gray-300 p-1'
                        />
                </div>
            </div>
            <div className='w-full border border-neutral-500 shadow-lg mt-5'></div>
            <div className="total-sales bg-white border border-gray-300 w-fit p-2 rounded-lg my-4">
                <h3><b>Total Sales:</b> <i className="fas fa-peso-sign" />{totalSales.toFixed(2)}</h3>
            </div>
                {renderGroupedData()}
            </div>
            <Footer />
        </div>
    );
}

export default AdminSales;
