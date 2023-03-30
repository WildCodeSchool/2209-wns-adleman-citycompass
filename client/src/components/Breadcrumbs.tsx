import React from "react";

interface BreadcrumbsProps {
  breadcrumbs: Crumbs[];
}

interface Crumbs {
  href: string;
  title: string;
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <div className="max-w-3xl">
      {breadcrumbs.map((breadcrumb: Crumbs, index: number) => (
        <a href={breadcrumb.href} className="text-xs text-darkBlue/30">
          <span>{breadcrumb.title}</span>
        </a>
      ))}
    </div>
  );
}

export default Breadcrumbs;
