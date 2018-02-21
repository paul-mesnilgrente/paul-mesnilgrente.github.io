---
layout: post
title:  "Forward kinematic equations of a PRPRR"
date:   2016-02-02 17:13:02 +0000
author: Paul Mesnilgrente
categories: robotics maths
featured: true
image: /assets/images/robotic_arm.jpg
comments: true
---

Forward kinematics refers to the use of the kinematic equations of a robot to
compute the position of the end-effector from specified values for the joint
parameters.

# 1. Preferential jacobian calculation

## (a) Calculation of \\(p, i, j\\)

- n = number of links = 5
- p = integer part of (n / 2) = 2
- i = p + 1 = 3
- j = p

## (b) Calculations of \\(z_{k(j)}\\)

**Formula# :** \\(z_{k(j)} = R_{kj}.O_kO_j(j)\\)

- \\(z_{1(2)} = R_{12}.\begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)
- \\(z_{2(2)} = R_{22}.\begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)
- \\(z_{3(2)} = R_{32}.\begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)
- \\(z_{4(2)} = R_{42}.\begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)
- \\(z_{5(2)} = R_{52}.\begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)

\\(R_{12} = 
\begin{pmatrix}
  c2 & -s2 & 0 \newline
  s2 & c2  & 0 \newline
  0  & 0   & 1
\end{pmatrix}\\)

\\(R_{22} = 
\begin{pmatrix}
  1 & 0 & 0\newline
  0 & 1 & 0\newline
  0 & 0 & 1
\end{pmatrix} \rightarrow\\) no rotation

\\(R_{32} = R_{23}^{-1} = R_{23}^T =
\begin{pmatrix}
  1 & 0 & 0\newline
  0 & 0 & -1\newline
  0 & 1 & 0
\end{pmatrix}\\)

\\(R_{42} = R_{43}.R_{32} = R_{34}^T.R_{32} = 
\begin{pmatrix}
  c4 & 0  & s4\newline
  s4 & 0  & c4\newline
  0  & -1 & 0
\end{pmatrix}.
\begin{pmatrix}
  1 & 0 & 0\newline
  0 & 0 & -1\newline
  0 & 1 & 0
\end{pmatrix}\\)

\\(R_{42} = 
\begin{pmatrix}
  c4 & s4 & 0\newline
  s4 & c4 & 0\newline
  0  & 0  & 1
\end{pmatrix}\\)

\\(R_{52} = R_{54}.R_{43} = R_{45}^T.R_{42} = 
\begin{pmatrix}
  c5  & 0 & -s5\newline
  -s5 & 0 & -c5\newline
  0   & 1 & 0
\end{pmatrix}.
\begin{pmatrix}
  c4 & s4 & 0\newline
  s4 & c4 & 0\newline
  0  & 0  & 1
\end{pmatrix}\\)

\\(R_{52} = 
\begin{pmatrix}
  c4.c5  & c5.s4 & -s5\newline
  -c4.s5 & -s4.s5 & -c5\newline
  s4 & c4 & 0
\end{pmatrix}\\)

\\(z_{1(2)} = \begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)

\\(z_{2(2)} = \begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)

\\(z_{3(2)} = \begin{pmatrix}0 & 0 & 0\end{pmatrix}^T\\)

\\(z_{4(2)} = \begin{pmatrix}0 & 0 & 1\end{pmatrix}^T\\)

\\(z_{5(2)} = \begin{pmatrix}-s5 & -c5 & 1\end{pmatrix}^T\\)

## (c) Calculations of \\(p_{ki(j)}\\)

**Formula# :** \\(p_{ki(j)} = O_kO_i(j)\\)

\\(O_1O_3(2) = O_1O_2(2) + O_2O_3(2) = 0 + \begin{pmatrix}0 & q3 & 0\end{pmatrix}^T\\)

\\(O_2O_3(2) = \begin{pmatrix}0 & q3 & 0\end{pmatrix}^T\\)

\\(O_3O_3(2) = \begin{pmatrix}0 & 0 & 0\end{pmatrix}^T\\)

\\(O_4O_3(2) = \begin{pmatrix}0 & 0 & 0\end{pmatrix}^T\\)

\\(O_5O_3(2) = \begin{pmatrix}0 & 0 & 0\end{pmatrix}^T\\)

## (d) Calculations of \\(z_{k(j)} \land p_{ki(j)}\\)

**Formula# :**
\\(\begin{pmatrix}a \newline b \newline c\end{pmatrix} \land \begin{pmatrix}d \newline e \newline f\end{pmatrix}
= 
\begin{pmatrix}
  b.f - c.e\newline
  c.d - a.f\newline
  a.e - b.d
\end{pmatrix}\\)

\\(z_{1(2)} \land p_{13(2)} = \begin{pmatrix}0 \newline 0 \newline 1\end{pmatrix} \land \begin{pmatrix}0 \newline q3 \newline 0\end{pmatrix} =
\begin{pmatrix}
  -q3\newline
  0\newline
  0
\end{pmatrix}\\)

\\(z_{2(2)} \land p_{23(2)} = \begin{pmatrix}0 \newline 0 \newline 1\end{pmatrix} \land \begin{pmatrix}0 \newline q3 \newline 0\end{pmatrix} =
\begin{pmatrix}
  -q3\newline
  0\newline
  0
\end{pmatrix}\\)

\\(z_{3(2)} \land p_{33(2)} = \begin{pmatrix}0 \newline 0 \newline 0\end{pmatrix} \land \begin{pmatrix}0 \newline 0 \newline 0\end{pmatrix} =
\begin{pmatrix}
  0\newline
  0\newline
  0
\end{pmatrix}\\)

\\(z_{4(2)} \land p_{43(2)} = \begin{pmatrix}0 \newline 0 \newline 1\end{pmatrix} \land \begin{pmatrix}0 \newline 0 \newline 0\end{pmatrix} =
\begin{pmatrix}
  0\newline
  0\newline
  0
\end{pmatrix}\\)

\\(z_{5(2)} \land p_{53(2)} = \begin{pmatrix}-s5 \newline -c5 \newline 1\end{pmatrix} \land \begin{pmatrix}0 \newline 0 \newline 0\end{pmatrix} =
\begin{pmatrix}
  0\newline
  0\newline
  0
\end{pmatrix}\\)

## Writing of the preferential jacobian

**Formula# :** \\(J_{i(j)} = 
\begin{pmatrix}
  \sigma_1.z_1 + \bar{\sigma_1}.z_{1(j)}\land p_{1i(j)} & \dots & \sigma_n.z_{n(j)} + \bar{\sigma_{n(j)}}.z_{n(j)}\land p_{ni(j)} \newline
  \bar{\sigma_1}.z_{1(j)} & \dots & \bar{\sigma_n}.z_{n(j)}
\end{pmatrix}\\)

Simplification with the nature link knowledge.

$$
\begin{align}
  J_{3(2)} &= 
  \begin{pmatrix}
    z_{1(2)}\land p_{13(2)} & z_{2(2)}\land p_{23(2)} & z_{3(2)} & z_{4(2)}\land p_{43(2)} & z_{5(2)}\land p_{53(2)}\newline
    z_{1(2)} & z_{2(2)} & O_{3\times1} & z_{4(2)} & z_{5(2)}
  \end{pmatrix}\newline
  &=
  \begin{pmatrix}
    -q3 & -q3 & 0 & 0 & 0\newline
      0 &   0 & 0 & 0 & 0\newline
      0 &   0 & 0 & 0 & 0\newline
      0 &   0 & 0 & 0 & -s5\newline
      0 &   0 & 0 & 0 & -c5\newline
      1 &   1 & 0 & 1 & 1
  \end{pmatrix}
\end{align}
$$

# 2. Calculations of \\(\hat{P}\_{in(j)}\\) by the vector \\(p\_{in(j)}\\)

**Formula# :** \\(\hat{P}\_{in(j)} =
\begin{pmatrix}
  0  & -z & y\newline
  z  &  0 & -x\newline
  -y &  x & 0
\end{pmatrix}\\)
avec \\(p\_{in(j)} = \begin{pmatrix}x & y & z\end{pmatrix}^T\\)

\\(p_{35(2)} = \begin{pmatrix}0\newline0\newline0\end{pmatrix}\\) so \\(\hat{P}\_{in(j)} = O\_{3\times3}\\)

# 3. Calculations of \\(dp\_{(0)}\\) and \\(d\varphi\_{(0)}\\)

**Formula# :**
\\(\begin{pmatrix}dp\_{(0)} \newline d\varphi\_{(0)}\end{pmatrix} =
\begin{pmatrix}
  R\_{03} & O\_{33}\newline
  O\_{33} & R\_{03}
\end{pmatrix}.
\begin{pmatrix}
  I\_{33} & -\hat{P}\_{in(j)}\newline
  O\_{33} & I\_{33}
\end{pmatrix}.J\_{3(2)}.dq\\)
avec
\\(dq = \begin{pmatrix}dq1 \newline \vdots \newline dqn\end{pmatrix}\\)

or \\(\hat{P}\_{in(j)} = O\_{3\times3}\\) so
\\(\begin{pmatrix}dp\_{(0)} \newline d\varphi\_{(0)}\end{pmatrix} =
\begin{pmatrix}
  R\_{03} & O\_{33}\newline
  O\_{33} & R\_{03}
\end{pmatrix}.J\_{3(2)}.dq\\)

\\(R\_{03} = R\_{12}.R\_{23}.R\_{34} =
\begin{pmatrix}
  1 & 0 & 0\newline
  0 & 1 & 0\newline
  0 & 0 & 1
\end{pmatrix}.
\begin{pmatrix}
  c2 & -s2 & 0 \newline
  s2 &  c2 & 0 \newline
  0  &   0 & 1
\end{pmatrix}.
\begin{pmatrix}
  1 &  0 & 0\newline
  0 &  0 & 1\newline
  0 & -1 & 0
\end{pmatrix} = 
\begin{pmatrix}
  c2 &  0 & -s2\newline
  s2 &  0 &  c2\newline
   0 & -1 &   0
\end{pmatrix}\\)

$$
\begin{align}
\begin{pmatrix}dp\_{(0)} \newline d\varphi\_{(0)}\end{pmatrix} &=
\begin{pmatrix}
  c2 &  0 & -s2 & 0 & 0 & 0\newline
  s2 &  0 &  c2 & 0 & 0 & 0\newline
   0 & -1 &   0 & 0 & 0 & 0\newline
  0 & 0 & 0 & c2 &  0 & -s2\newline
  0 & 0 & 0 & s2 &  0 &  c2\newline
  0 & 0 & 0 &  0 & -1 &   0
\end{pmatrix}.
\begin{pmatrix}
  -q3 & -q3 & 0 & 0 & 0\newline
    0 &   0 & 0 & 0 & 0\newline
    0 &   0 & 0 & 0 & 0\newline
    0 &   0 & 0 & 0 & -s5\newline
    0 &   0 & 0 & 0 & -c5\newline
    1 &   1 & 0 & 1 & 1
\end{pmatrix}.
\begin{pmatrix}
  dq1\newline dq2\newline dq3\newline dq4\newline dq5
\end{pmatrix}\newline
&=
\begin{pmatrix}
                       - c2.dq1.q3 - c2.dq2.q3\newline
                       - dq1.q3.s2 - dq2.q3.s2\newline
                                             0\newline
 - dq1.s2 - dq2.s2 - dq4.s2 - dq5.(s2 + c2.s5)\newline
   c2.dq1 + c2.dq2 + c2.dq4 + dq5.(c2 - s2.s5)\newline
                                        c5.dq5
\end{pmatrix}
\end{align}
$$