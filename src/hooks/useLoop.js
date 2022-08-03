import { useState } from "react";

export default function useLoop(size) {
    if (!size) return [];
     return Array.from({ length: size });
}