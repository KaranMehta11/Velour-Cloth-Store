import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiPackage,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-9 flex items-center overflow-hidden"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="marquee-track">
          {[1, 2].map((i) => (
            <span
              key={i}
              className="whitespace-nowrap pr-16"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "#FDFCFA",
                fontWeight: 300,
              }}
            >
              FREE SHIPPING ON ORDERS ABOVE ₹4,999 &nbsp;✦&nbsp; NEW COLLECTION NOW LIVE &nbsp;✦&nbsp; SUSTAINABLE FABRICS &nbsp;✦&nbsp; EASY 30-DAY RETURNS &nbsp;✦&nbsp; HANDCRAFTED IN INDIA &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* MAIN NAV */}
      <nav
        className="fixed z-50 w-full transition-all duration-400 h-20"
        style={{
          top: "36px",
          backgroundColor: scrolled ? "#F5F0E8" : "rgba(0, 0, 0, 0.3)",
          color: scrolled ? "#0A0A0A" : "white",
          borderBottom: scrolled ? "1px solid #E8E0D0" : "none",
          backdropFilter: scrolled ? "blur(10px)" : "blur(8px)",
        }}
      >
        <div
          className="flex items-center justify-between h-full px-10"
          style={{ maxWidth: "100%" }}
        >
          {/* LEFT LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {leftNav.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="gold-underline"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: scrolled ? "#0A0A0A" : "white",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CENTER LOGO */}
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "26px",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.35em",
              color: scrolled ? "#0A0A0A" : "white",
            }}
          >
            VELOUR
          </Link>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-6">
            {/* RIGHT LINKS */}
            <div className="flex items-center gap-6">
              {rightNav.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="gold-underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: scrolled ? "#0A0A0A" : "white",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* SEARCH ICON */}
            <button
              style={{ color: scrolled ? "#0A0A0A" : "white" }}
              className="transition-colors duration-300"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B8963E")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = scrolled ? "#0A0A0A" : "white")
              }
            >
              <FiSearch size={18} />
            </button>

            {/* WISHLIST */}
            <Link
              to="/account?tab=wishlist"
              className="relative transition-colors duration-300"
              style={{ color: scrolled ? "#0A0A0A" : "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B8963E")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = scrolled ? "#0A0A0A" : "white")
              }
            >
              <FiHeart size={18} />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#B8963E",
                    color: "#FDFCFA",
                    fontSize: "9px",
                    fontWeight: 500,
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative transition-colors duration-300"
              style={{ color: scrolled ? "#0A0A0A" : "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B8963E")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = scrolled ? "#0A0A0A" : "white")
              }
            >
              <FiShoppingBag size={18} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#B8963E",
                    color: "#FDFCFA",
                    fontSize: "9px",
                    fontWeight: 500,
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* USER MENU */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="transition-colors duration-300"
                  style={{
                    color: scrolled ? "#0A0A0A" : "white",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-600"
                    style={{
                      backgroundColor: "#B8963E",
                      color: "#FDFCFA",
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 border z-50 py-2 w-48"
                      style={{
                        backgroundColor: "#FDFCFA",
                        borderColor: "#E8E0D0",
                      }}
                    >
                      <Link
                        to="/account"
                        className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                        style={{ color: "#0A0A0A" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#F5F0E8")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        <FiUser size={14} /> My Account
                      </Link>
                      <Link
                        to="/account?tab=orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                        style={{ color: "#0A0A0A" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#F5F0E8")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        <FiPackage size={14} /> Orders
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm font-500 transition-colors"
                          style={{ color: "#B8963E" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F5F0E8")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                          }
                        >
                          Admin Panel
                        </Link>
                      )}
                      <hr style={{ borderColor: "#E8E0D0", margin: "0.25rem 0" }} />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-colors"
                        style={{ color: "#E63946" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(230, 57, 70, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <FiLogOut size={14} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: scrolled ? "#0A0A0A" : "white",
                }}
                className="gold-underline"
              >
                LOGIN
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ color: scrolled ? "#0A0A0A" : "white" }}
          >
            {mobileOpen ? (
              <FiX size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              style={{ top: "36px" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center gap-10"
              style={{
                backgroundColor: "#0A0A0A",
                top: "36px",
              }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-8"
                style={{ color: "white" }}
              >
                <FiX size={24} />
              </button>
              {[...leftNav, ...rightNav].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(32px, 5vw, 48px)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "white",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold mt-10"
                >
                  LOGIN
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 mt-10 text-red-500 font-500"
                >
                  <FiLogOut size={18} /> Logout
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
