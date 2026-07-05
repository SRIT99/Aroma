import Link from "next/link"
export default function WhyChooseUs() {
  const reasons = [
    {
      icon: '👨‍🍳',
      title: 'Expert Chefs',
      description: 'Our experienced culinary team crafts authentic recipes with passion',
    },
    {
      icon: '🥘',
      title: 'Fresh Ingredients',
      description: 'Only the finest, locally sourced ingredients go into every dish',
    },
    {
      icon: '⚡',
      title: 'Quick Service',
      description: 'Fast and efficient service without compromising on quality',
    },
    {
      icon: '🎉',
      title: 'Best Ambiance',
      description: 'Enjoy your meal in a warm and welcoming atmosphere',
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-white via-background to-primary/5">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Why Choose Aroma?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Experience dining that goes beyond just food
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="animate-fade-in-up p-6 bg-white rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted text-sm">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">
            Ready for an exceptional dining experience?
          </h3>
          <Link href="#contact" className="btn-primary inline-block">
            Reserve Your Table Today
          </Link>
        </div>
      </div>
    </section>
  )
}
