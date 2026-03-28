import { useState } from "react";
import Icon from "@/components/ui/icon";

/* ─── Данные меню ─── */
const MENU = {
  "Кофе": [
    { id: 1, name: "Эспрессо", desc: "Двойной шот арабики", price: 180, tag: "хит" },
    { id: 2, name: "Флэт уайт", desc: "Ристретто с бархатным молоком", price: 290, tag: "" },
    { id: 3, name: "Капучино авторский", desc: "С карамелью и морской солью", price: 320, tag: "новинка" },
    { id: 4, name: "Раф классический", desc: "Сливки, ваниль, эспрессо", price: 350, tag: "хит" },
    { id: 5, name: "Латте матча", desc: "Церемониальная матча с овсяным", price: 370, tag: "" },
    { id: 6, name: "Колд брю", desc: "18-часовое холодное заваривание", price: 310, tag: "" },
  ],
  "Чай": [
    { id: 7, name: "Улун молочный", desc: "Бархатный тайваньский улун", price: 260, tag: "хит" },
    { id: 8, name: "Чай масала", desc: "Пряный с имбирём и кардамоном", price: 280, tag: "" },
    { id: 9, name: "Сенча холодная", desc: "Японский зелёный чай со льдом", price: 290, tag: "новинка" },
    { id: 10, name: "Ройбос с ягодами", desc: "Южноафриканский с малиной", price: 270, tag: "" },
  ],
  "Выпечка": [
    { id: 11, name: "Круассан миндальный", desc: "С франжипан и хрустящей корочкой", price: 220, tag: "хит" },
    { id: 12, name: "Синнабон mozaic", desc: "Авторский с корицей и пеканом", price: 260, tag: "" },
    { id: 13, name: "Тарт лимонный", desc: "На песочном тесте с курдом", price: 290, tag: "новинка" },
    { id: 14, name: "Маффин черника", desc: "Свежая черника, сливочный сыр", price: 200, tag: "" },
  ],
};

type MenuItem = { id: number; name: string; desc: string; price: number; tag: string };
type CartItem = MenuItem & { qty: number };
type Page = "menu" | "cart" | "favorites" | "orders" | "about" | "profile";

const COFFEE_IMG = "https://cdn.poehali.dev/projects/acb0fa2f-c46a-444c-9dfc-beae128d8446/files/119c961d-3203-47b0-b5c0-9551b996ab36.jpg";

const NAV: { id: Page; icon: string; label: string }[] = [
  { id: "menu", icon: "LayoutGrid", label: "Меню" },
  { id: "cart", icon: "ShoppingBag", label: "Корзина" },
  { id: "favorites", icon: "Heart", label: "Избранное" },
  { id: "orders", icon: "ClipboardList", label: "Заказы" },
  { id: "about", icon: "Info", label: "О нас" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("menu");
  const [activeCategory, setActiveCategory] = useState("Кофе");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const found = prev.find(c => c.id === item.id);
      if (found) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const found = prev.find(c => c.id === id);
      if (!found) return prev;
      if (found.qty === 1) return prev.filter(c => c.id !== id);
      return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  };

  const toggleFav = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const favItems = Object.values(MENU).flat().filter(i => favorites.includes(i.id));

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">

      {/* Hero header */}
      {page === "menu" && (
        <header className="relative overflow-hidden h-52">
          <img src={COFFEE_IMG} alt="Mozaic Coffee" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/65" />
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6">
            <p className="font-golos text-xs tracking-[0.25em] text-white/60 uppercase mb-1">Премиум кофейня</p>
            <h1 className="font-cormorant text-5xl font-light text-white tracking-wide leading-none">Mozaic</h1>
            <p className="font-cormorant italic text-xl text-white/65 leading-tight">coffee · tea</p>
          </div>
        </header>
      )}

      {page !== "menu" && (
        <header className="px-6 pt-12 pb-5 border-b border-border">
          <h1 className="font-cormorant text-3xl font-light tracking-wide">
            {NAV.find(n => n.id === page)?.label}
          </h1>
        </header>
      )}

      {/* Контент */}
      <main className="flex-1 overflow-y-auto pb-24">

        {/* МЕНЮ */}
        {page === "menu" && (
          <div className="animate-fade-in">
            <div className="flex border-b border-border">
              {Object.keys(MENU).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 py-3 font-golos text-sm tracking-wide transition-all ${
                    activeCategory === cat
                      ? "text-foreground border-b-2 border-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="px-4 pt-4 space-y-3">
              {MENU[activeCategory as keyof typeof MENU].map((item) => {
                const inCart = cart.find(c => c.id === item.id);
                const isFav = favorites.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="animate-fade-in bg-card rounded-sm border border-border p-4"
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <h3 className="font-cormorant text-[1.2rem] font-medium leading-tight">{item.name}</h3>
                      {item.tag && (
                        <span className="text-[9px] font-golos uppercase tracking-widest bg-amber-100 text-amber-700 px-2 py-0.5 rounded-sm whitespace-nowrap mt-0.5">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="font-golos text-xs text-muted-foreground mb-3">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-cormorant text-2xl font-medium">{item.price} ₽</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleFav(item.id)} className="p-1.5 rounded-sm transition-colors">
                          <Icon
                            name="Heart"
                            size={16}
                            className={isFav ? "fill-red-400 text-red-400" : "text-muted-foreground"}
                          />
                        </button>
                        {inCart ? (
                          <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="px-3 py-2 text-sm font-golos hover:bg-muted transition-colors"
                            >−</button>
                            <span className="font-golos text-sm w-5 text-center border-x border-border py-2">{inCart.qty}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="px-3 py-2 text-sm font-golos hover:bg-muted transition-colors"
                            >+</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-foreground text-background font-golos text-xs tracking-wide px-4 py-2 rounded-sm hover:opacity-75 transition-opacity"
                          >
                            В корзину
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* КОРЗИНА */}
        {page === "cart" && (
          <div className="animate-fade-in px-4 pt-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3">
                <Icon name="ShoppingBag" size={44} className="text-muted-foreground/25" />
                <p className="font-golos text-sm text-muted-foreground">Корзина пуста</p>
                <button
                  onClick={() => setPage("menu")}
                  className="font-golos text-sm underline underline-offset-4"
                >Перейти в меню</button>
              </div>
            ) : (
              <div>
                <div className="space-y-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-4 border-b border-border">
                      <div className="flex-1">
                        <p className="font-cormorant text-lg leading-tight">{item.name}</p>
                        <p className="font-golos text-xs text-muted-foreground">{item.price} ₽ × {item.qty}</p>
                      </div>
                      <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden">
                        <button onClick={() => removeFromCart(item.id)} className="px-2.5 py-1.5 text-sm hover:bg-muted transition-colors">−</button>
                        <span className="font-golos text-sm w-5 text-center border-x border-border py-1.5">{item.qty}</span>
                        <button onClick={() => addToCart(item)} className="px-2.5 py-1.5 text-sm hover:bg-muted transition-colors">+</button>
                      </div>
                      <p className="font-cormorant text-lg w-16 text-right">{item.price * item.qty} ₽</p>
                    </div>
                  ))}
                </div>
                <div className="pt-6 space-y-5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-golos text-sm text-muted-foreground">Итого</span>
                    <span className="font-cormorant text-4xl">{cartTotal} ₽</span>
                  </div>
                  <button className="w-full bg-foreground text-background font-golos text-sm tracking-widest uppercase py-4 rounded-sm hover:opacity-75 transition-opacity">
                    Оформить заказ
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ИЗБРАННОЕ */}
        {page === "favorites" && (
          <div className="animate-fade-in px-4 pt-4">
            {favItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3">
                <Icon name="Heart" size={44} className="text-muted-foreground/25" />
                <p className="font-golos text-sm text-muted-foreground">Нет избранных позиций</p>
                <button onClick={() => setPage("menu")} className="font-golos text-sm underline underline-offset-4">Перейти в меню</button>
              </div>
            ) : (
              <div className="space-y-3">
                {favItems.map(item => (
                  <div key={item.id} className="bg-card border border-border rounded-sm p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-cormorant text-xl">{item.name}</p>
                      <p className="font-golos text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-cormorant text-xl">{item.price} ₽</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-foreground text-background font-golos text-xs px-3 py-2 rounded-sm hover:opacity-75 transition-opacity"
                      >+ Корзина</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ЗАКАЗЫ */}
        {page === "orders" && (
          <div className="animate-fade-in flex flex-col items-center justify-center gap-4 mt-20">
            <Icon name="ClipboardList" size={52} className="text-muted-foreground/20" />
            <p className="font-cormorant text-2xl text-center font-light">История заказов<br />пока пуста</p>
            <p className="font-golos text-sm text-muted-foreground text-center">После первого заказа здесь<br />появится вся история</p>
          </div>
        )}

        {/* О НАС */}
        {page === "about" && (
          <div className="animate-fade-in">
            <div className="relative h-48 overflow-hidden">
              <img src={COFFEE_IMG} alt="" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
            </div>
            <div className="px-6 pb-8 space-y-8">
              <div>
                <h2 className="font-cormorant text-3xl font-light mb-3">Наша история</h2>
                <p className="font-golos text-sm text-muted-foreground leading-relaxed">
                  Mozaic Coffee Tea — сеть премиальных кофеен, где каждая чашка создаётся с уважением к зерну и традиции. Мы отбираем зелёный кофе напрямую у фермеров из Эфиопии, Колумбии и Эль-Сальвадора.
                </p>
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-light mb-3">Философия</h3>
                <p className="font-golos text-sm text-muted-foreground leading-relaxed">
                  Минимализм в интерьере — максимализм во вкусе. Мы верим, что лучший кофе не требует украшений. Только качество, мастерство, время.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border text-center">
                {[["2018", "Год основания"], ["12", "Кофеен"], ["48", "Сортов кофе"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="font-cormorant text-3xl font-light">{num}</p>
                    <p className="font-golos text-xs text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-light mb-4">Адреса</h3>
                <div className="space-y-3">
                  {["ул. Тверская, 14", "Кутузовский пр-т, 26", "ул. Арбат, 8"].map(addr => (
                    <div key={addr} className="flex items-center gap-3">
                      <Icon name="MapPin" size={14} className="text-muted-foreground shrink-0" />
                      <span className="font-golos text-sm">{addr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {page === "profile" && (
          <div className="animate-fade-in px-6 pt-6 space-y-8">
            <div className="flex items-center gap-5 py-4 border-b border-border">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <Icon name="User" size={24} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-cormorant text-2xl font-medium">Гость</p>
                <p className="font-golos text-xs text-muted-foreground">Войдите, чтобы копить бонусы</p>
              </div>
            </div>

            <button className="w-full bg-foreground text-background font-golos text-sm tracking-widest uppercase py-4 rounded-sm hover:opacity-75 transition-opacity">
              Войти или зарегистрироваться
            </button>

            <div>
              {[
                { icon: "Gift", label: "Бонусная программа" },
                { icon: "Bell", label: "Уведомления" },
                { icon: "MapPin", label: "Адреса доставки" },
                { icon: "CreditCard", label: "Способы оплаты" },
                { icon: "HelpCircle", label: "Помощь и поддержка" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center justify-between py-4 border-b border-border hover:text-muted-foreground transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={icon} size={18} className="text-muted-foreground" />
                    <span className="font-golos text-sm">{label}</span>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground/40" />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-sm border-t border-border z-50">
        <div className="flex">
          {NAV.map(({ id, icon, label }) => {
            const isActive = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
                  isActive ? "text-foreground" : "text-muted-foreground/50 hover:text-muted-foreground"
                }`}
              >
                <div className="relative">
                  <Icon name={icon} size={20} />
                  {id === "cart" && cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-foreground text-background text-[9px] font-golos font-medium rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  {id === "favorites" && favorites.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-foreground text-background text-[9px] font-golos font-medium rounded-full w-4 h-4 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className={`font-golos text-[10px] ${isActive ? "opacity-100" : "opacity-50"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
