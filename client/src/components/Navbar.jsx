import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiUser,
  FiSearch,
} from "react-icons/fi";
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";
import useWishlistStore from "../store/useWishlistStore";

const leftNav = [
  { label: "MEN", to: "/shop?category=Men" },
  { label: "WOMEN", to: "/shop?category=Women" },
  { label: "ACCESSORIES", to: "/shop?category=Accessories" },
];

const rightNav = [
  { label: "SALE", to: "/shop?sort=price_asc" },
  { label: "NEW IN", to: "/shop?sort=newest" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };


  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="hidden md:grid fixed top-[36px] left-0 right-0 z-[9999] h-16 grid-cols-3 items-center px-8 lg:px-14 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(12,10,8,0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(184,150,62,0.15)"
            : "none",
        }}
      >
        <style>{`
          .nav-link {
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            position: relative;
            transition: color 300ms ease;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: #B8963E;
            transition: width 300ms ease;
          }
          .nav-link:hover {
            color: #B8963E;
          }
          .nav-link:hover::after {
            width: 100%;
          }
          .nav-divider {
            width: 1px;
            height: 16px;
            background: rgba(184,150,62,0.2);
            margin: 0 24px;
          }
          .icon-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: rgba(255,255,255,0.7);
            transition: color 300ms ease;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
          }
          .icon-btn:hover {
            color: #B8963E;
          }
          .icon-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #B8963E;
            color: white;
            font-size: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
          }
        `}</style>

        {/* Left Section - Categories */}
        <div className="flex gap-8 items-center justify-start">
          {leftNav.map((nav) => (
            <Link key={nav.to} to={nav.to} className="nav-link">
              {nav.label}
            </Link>
          ))}
        </div>

        {/* Center Section - Logo */}
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="text-white text-2xl italic tracking-widest"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              letterSpacing: "0.4em",
            }}
          >
            VELOUR
          </Link>
        </div>

        {/* Right Section - Actions */}
        <div className="flex gap-4 items-center justify-end">
          {rightNav.map((nav) => (
            <Link key={nav.to} to={nav.to} className="nav-link">
              {nav.label}
            </Link>
          ))}
          <div className="nav-divider" />
          <button
            className="icon-btn"
            onClick={() => navigate("/shop")}
            title="Search"
          >
            <FiSearch size={18} />
          </button>
          <button
            className="icon-btn"
            onClick={() => navigate("/account")}
            title="Wishlist"
          >
            <FiHeart size={18} />
            {wishlistCount > 0 && (
              <div className="icon-badge">{wishlistCount}</div>
            )}
          </button>
          <button
            className="icon-btn"
            onClick={() => setCartOpen(true)}
            title="Shopping Cart"
          >
            <FiShoppingBag size={18} />
            {itemCount > 0 && <div className="icon-badge">{itemCount}</div>}
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              className="icon-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              title={user ? "Account" : "Login"}
            >
              <FiUser size={18} />
            </button>
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 200 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl p-2"
                  style={{
                    background: "rgba(18,15,12,0.96)",
                    border: "1px solid rgba(184,150,62,0.2)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {user ? (
                    <>
                      <Link
                        to="/account"
                        className="block px-4 py-2.5 text-xs uppercase tracking-wider"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "Jost, sans-serif",
                        }}
                        onClick={() => setUserMenuOpen(false)}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "#B8963E")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(255,255,255,0.6)")
                        }
                      >
                        My Account
                      </Link>
                      <Link
                        to="/account?tab=orders"
                        className="block px-4 py-2.5 text-xs uppercase tracking-wider"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "Jost, sans-serif",
                        }}
                        onClick={() => setUserMenuOpen(false)}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "#B8963E")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(255,255,255,0.6)")
                        }
                      >
                        My Orders
                      </Link>
                      <div
                        style={{
                          height: "1px",
                          background: "rgba(184,150,62,0.2)",
                          margin: "8px 0",
                        }}
                      />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider transition-colors"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "Jost, sans-serif",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "#B8963E")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(255,255,255,0.6)")
                        }
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2.5 text-xs uppercase tracking-wider"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "Jost, sans-serif",
                        }}
                        onClick={() => setUserMenuOpen(false)}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "#B8963E")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(255,255,255,0.6)")
                        }
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2.5 text-xs uppercase tracking-wider"
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "Jost, sans-serif",
                        }}
                        onClick={() => setUserMenuOpen(false)}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "#B8963E")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(255,255,255,0.6)")
                        }
                      >
                        Register
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className="md:hidden fixed top-[36px] left-0 right-0 z-[9999] h-16 flex items-center justify-between px-4"
        style={{
          background: scrolled
            ? "rgba(12,10,8,0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(184,150,62,0.15)"
            : "none",
        }}
      >
        <button
          className="icon-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FiX size={20} color="rgba(255,255,255,0.7)" />
          ) : (
            <FiMenu size={20} color="rgba(255,255,255,0.7)" />
          )}
        </button>
        <Link
          to="/"
          className="text-white text-lg italic tracking-widest"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            letterSpacing: "0.4em",
          }}
        >
          VELOUR
        </Link>
        <button
          className="icon-btn"
          onClick={() => setCartOpen(true)}
        >
          <FiShoppingBag size={18} color="rgba(255,255,255,0.7)" />
          {itemCount > 0 && (
            <div
              className="absolute"
              style={{
                top: "-6px",
                right: "-6px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#B8963E",
                color: "white",
                fontSize: "9px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}
            >
              {itemCount}
            </div>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40"
              style={{
                background: "rgba(0,0,0,0.8)",
                top: "100px",
              }}
            />
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="md:hidden fixed left-0 top-[100px] h-screen w-screen z-50 flex flex-col"
              style={{
                background: "#0A0A0A",
                paddingTop: "32px",
                paddingLeft: "32px",
                paddingRight: "32px",
              }}
            >
              <div className="flex flex-col gap-6">
                {[...leftNav, ...rightNav].map((nav) => (
                  <Link
                    key={nav.to}
                    to={nav.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white italic"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "42px",
                      letterSpacing: "0.4em",
                      transition: "color 300ms ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#B8963E")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "white")
                    }
                  >
                    {nav.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
