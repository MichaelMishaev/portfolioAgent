"use client";

import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

// ============================================
// UNIFIED STATS COMPONENT
// ============================================

interface StatItem {
  value: string;
  label: string;
  labelRu: string;
}

interface StatsProps {
  stats: StatItem[];
  language?: 'en' | 'ru';
}

export const Stats = ({
  stats = [
    { value: "150+", label: "Projects Completed", labelRu: "Завершенных проектов" },
    { value: "50+", label: "Happy Clients", labelRu: "Довольных клиентов" },
    { value: "8+", label: "Years Experience", labelRu: "Лет опыта" },
    { value: "15+", label: "Awards Won", labelRu: "Наград получено" },
  ],
  language = 'en',
}: StatsProps) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { actions: editorActions } = useEditor();

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`py-20 border-t border-2 ${selected ? "border-blue-500" : "border-transparent"}`}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button
            onClick={() => editorActions.delete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
      <div className="container mx-auto px-3 sm:px-3">
        <div className={`grid gap-8 ${
          stats.length === 2 ? 'grid-cols-2' :
          stats.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          'grid-cols-2 md:grid-cols-4'
        }`}>
          {stats.map((stat, index) => {
            const displayLabel = language === 'ru' ? stat.labelRu : stat.label;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{displayLabel}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// SETTINGS PANEL
function StatsSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as StatsProps,
  }));

  const language = props.language || 'en';

  const labels = {
    en: {
      stats: 'STATS',
      stat: 'Stat',
      value: 'Value',
      label: 'Label',
      addStat: 'Add Stat',
      removeStat: 'Remove',
    },
    ru: {
      stats: 'СТАТИСТИКА',
      stat: 'Показатель',
      value: 'Значение',
      label: 'Подпись',
      addStat: 'Добавить показатель',
      removeStat: 'Удалить',
    },
  };

  const t = labels[language];

  return (
    <div className="space-y-4 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="text-sm font-medium">{t.stats}</div>

      {props.stats.map((stat: StatItem, index: number) => (
        <div key={index} className="p-3 border rounded space-y-2">
          <div className="flex items-center justify-between mb-2">
            <Label className="font-semibold">{t.stat} {index + 1}</Label>
            {props.stats.length > 1 && (
              <button
                onClick={() =>
                  setProp((props: StatsProps) => {
                    props.stats = props.stats.filter((_, i) => i !== index);
                  })
                }
                className="text-xs text-red-500 hover:text-red-700"
              >
                {t.removeStat}
              </button>
            )}
          </div>

          <div>
            <Label className="text-xs">{t.value}</Label>
            <Input
              value={stat.value}
              onChange={(e) =>
                setProp((props: StatsProps) => {
                  props.stats[index].value = e.target.value;
                })
              }
            />
          </div>

          <div>
            <Label className="text-xs">{t.label} (EN)</Label>
            <Input
              value={stat.label}
              onChange={(e) =>
                setProp((props: StatsProps) => {
                  props.stats[index].label = e.target.value;
                })
              }
            />
          </div>

          <div>
            <Label className="text-xs">{t.label} (RU)</Label>
            <Input
              value={stat.labelRu}
              onChange={(e) =>
                setProp((props: StatsProps) => {
                  props.stats[index].labelRu = e.target.value;
                })
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={() =>
          setProp((props: StatsProps) => {
            props.stats.push({
              value: "10+",
              label: "New Stat",
              labelRu: "Новый показатель",
            });
          })
        }
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        {t.addStat}
      </button>
    </div>
  );
}

// CRAFT.JS CONFIG
Stats.craft = {
  displayName: "Stats",
  props: {
    stats: [
      { value: "150+", label: "Projects Completed", labelRu: "Завершенных проектов" },
      { value: "50+", label: "Happy Clients", labelRu: "Довольных клиентов" },
      { value: "8+", label: "Years Experience", labelRu: "Лет опыта" },
      { value: "15+", label: "Awards Won", labelRu: "Наград получено" },
    ],
    language: 'en' as 'en' | 'ru',
  },
  related: {
    settings: StatsSettings,
  },
};
