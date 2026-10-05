import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  getCartSubtotal,
  getItemImage,
  getItemName,
  getItemPrice,
} from '../../utils/cart';
import { saveOrder } from '../../utils/orders';
import {
  normalizeMpesaPhone,
  startStkPush,
  waitForPayment,
} from '../../utils/mpesa';
import { formatKsh } from '../../utils/format';

const inputClass =
  'w-full bg-[#F5F5F5] p-4 rounded-sm outline-none border border-transparent focus:border-[#DB4444] transition';

const Checkout = () => {
  const { cart, clearCart } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.displayName || '',
    address: '',
    city: '',
    phone: '',
    email: user?.email || '',
  });
  const [payment, setPayment] = useState('Cash on Delivery');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const subtotal = getCartSubtotal(cart);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const completeOrder = (orderNumber, total) => {
    saveOrder({
      orderNumber,
      ...form,
      paymentMethod: payment,
      total,
      items: cart.map(i => ({
        id: i.id,
        name: getItemName(i),
        quantity: i.quantity,
      })),
      placedAt: new Date().toISOString(),
    });
    clearCart();
    navigate('/order-success', {
      state: { orderNumber, total, paymentMethod: payment },
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!cart.length) return setError('Your cart is empty');
    if (!form.name || !form.address || !form.city || !form.phone || !form.email) {
      return setError('Please fill in all required fields');
    }

    const orderNumber = 'ORD' + Math.floor(100000 + Math.random() * 900000);
    const total = subtotal.toFixed(2);

    if (payment === 'Cash on Delivery') {
      return completeOrder(orderNumber, total);
    }

    const phone = normalizeMpesaPhone(mpesaPhone || form.phone);
    if (!phone) {
      return setError(
        'Enter a valid M-Pesa phone number, e.g. 0712345678 or +254712345678',
      );
    }

    setProcessing(true);
    try {
      setStatus('Sending payment request to your phone...');
      const { checkoutRequestId } = await startStkPush({
        amountKes: subtotal,
        phone,
        orderNumber,
      });

      setStatus('Enter your M-Pesa PIN on your phone to complete payment...');
      await waitForPayment(checkoutRequestId);
      completeOrder(orderNumber, total);
    } catch (err) {
      setError(err.message || 'M-Pesa payment failed. Please try again.');
    } finally {
      setProcessing(false);
      setStatus('');
    }
  };

  return (
    <section className="pb-35">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <p className="font-poppins text-sm text-black/50">
            <Link to="/" className="hover:text-[#DB4444]">
              Home
            </Link>{' '}
            /{' '}
            <Link to="/cart" className="hover:text-[#DB4444]">
              Cart
            </Link>{' '}
            / <span className="text-black">Checkout</span>
          </p>
        </div>

        <h1 className="font-inter font-medium text-4xl mb-10">Billing Details</h1>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-black/50 mb-6">Your cart is empty.</p>
            <Link
              to="/shop"
              className="bg-[#DB4444] text-white px-12 py-4 rounded-sm inline-block"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2 space-y-6">
              {[
                ['name', 'Full Name', 'text'],
                ['address', 'Street Address', 'text'],
                ['city', 'Town/City', 'text'],
                ['phone', 'Phone Number', 'tel'],
                ['email', 'Email Address', 'email'],
              ].map(([name, label, type]) => (
                <div key={name}>
                  <label className="block font-poppins text-base text-black/50 mb-2">
                    {label} <span className="text-[#DB4444]">*</span>
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/2 max-w-[527px]">
              <div className="space-y-6 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={getItemImage(item)}
                        alt={getItemName(item)}
                        className="w-12"
                      />
                      <span className="font-poppins">
                        {getItemName(item)} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-poppins">
                      {formatKsh(getItemPrice(item) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-b border-black/40 pb-4 mb-4">
                <span>Subtotal:</span>
                <span>{formatKsh(subtotal)}</span>
              </div>
              <div className="flex justify-between border-b border-black/40 pb-4 mb-4">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mb-8 font-medium">
                <span>Total:</span>
                <span>{formatKsh(subtotal)}</span>
              </div>

              <div className="space-y-4 mb-8">
                {['Cash on Delivery', 'M-Pesa'].map(method => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === method}
                      onChange={() => {
                        setPayment(method);
                        setError('');
                      }}
                      disabled={processing}
                      className="accent-black w-5 h-5"
                    />
                    <span className="font-poppins">{method}</span>
                  </label>
                ))}
                {payment === 'M-Pesa' && (
                  <input
                    type="tel"
                    value={mpesaPhone}
                    onChange={e => {
                      setMpesaPhone(e.target.value);
                      setError('');
                    }}
                    disabled={processing}
                    placeholder="M-Pesa phone (defaults to phone above)"
                    className={inputClass}
                  />
                )}
              </div>

              {status && <p className="text-black/70 text-sm mb-4">{status}</p>}
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                disabled={processing}
                className="px-12 py-4 bg-[#DB4444] text-white font-poppins font-medium rounded-sm disabled:opacity-70"
              >
                {processing ? 'Processing...' : 'Checkout / Purchase'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Checkout;
